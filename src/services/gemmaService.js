import axios from "axios";
import { buildGemmaPrompt } from "../utils/gemma/gemmaPromptBuilder.js";

const OLLAMA_API_URL =
  process.env.OLLAMA_API_URL || "https://backend-dc-02.vercel.app/api/generate";

const MODEL_NAME = process.env.GEMMA_MODEL || "qwen2.5:7b-instruct-q4_K_M";

// Clean response - lebih aggressive
const sanitizeResponse = (text) => {
  return text
    .replace(/```json/gi, "")
    .replace(/```javascript/gi, "")
    .replace(/```/g, "")
    .replace(/^[^{[]*/, "") // Hapus semua sebelum { atau [
    .replace(/[^}\]]*$/, "") // Hapus semua setelah } atau ]
    .trim();
};

// Validasi dan perbaiki struktur JSON
const validateAndFixJSON = (jsonObj) => {
  if (!jsonObj.questions || !Array.isArray(jsonObj.questions)) {
    throw new Error("Invalid JSON structure: questions array missing");
  }

  // Fix setiap question
  jsonObj.questions = jsonObj.questions
    .map((q, index) => {
      // Pastikan struktur dasar ada
      if (!q.question || !q.type || !q.options) {
        console.warn(
          `⚠️ Question ${index + 1} has missing fields, skipping...`
        );
        return null;
      }

      // Pastikan semua opsi punya feedback
      const fixedOptions = {};
      for (const [key, opt] of Object.entries(q.options)) {
        fixedOptions[key] = {
          text: opt.text || "",
          isCorrect: opt.isCorrect || false,
          feedback:
            opt.feedback || generateDefaultFeedback(opt.text, opt.isCorrect),
        };
      }

      // Pastikan explanation ada
      const explanation =
        q.explanation ||
        "Untuk pemahaman lebih lanjut, silakan review kembali materi terkait konsep ini.";

      return {
        question: q.question,
        type: q.type,
        options: fixedOptions,
        explanation: explanation,
      };
    })
    .filter((q) => q !== null); // Hapus yang null

  return jsonObj;
};

// Generate default feedback jika kosong
const generateDefaultFeedback = (optionText, isCorrect) => {
  if (isCorrect) {
    return `Benar! ${optionText} adalah jawaban yang tepat sesuai dengan konsep yang dipelajari.`;
  } else {
    return `Kurang tepat. Perhatikan kembali perbedaan konsep ini dengan materi yang telah dijelaskan.`;
  }
};

export const generateQuestionGemma = async (content, count = 5) => {
  try {
    console.log("⚡ Generating with local AI model:", MODEL_NAME);
    console.log(`📊 Requested questions: ${count}`);

    const prompt = buildGemmaPrompt(content, count);

    // Tambahkan parameter untuk hasil lebih konsisten
    const response = await axios.post(OLLAMA_API_URL, {
      model: MODEL_NAME,
      prompt,
      stream: false,
      options: {
        temperature: 0.7, // Kreativitas sedang
        top_p: 0.9, // Fokus pada token berkualitas
        top_k: 40, // Batasi pilihan token
        repeat_penalty: 1.1, // Hindari pengulangan
        num_predict: 4096, // Max tokens output
      },
    });

    if (!response.data || !response.data.response) {
      throw new Error("Ollama returned empty content");
    }

    console.log("🔍 Raw AI Response Length:", response.data.response.length);

    // Clean output
    const cleaned = sanitizeResponse(response.data.response);
    console.log("✨ Cleaned Response Length:", cleaned.length);

    // Parse JSON
    let jsonOutput;
    try {
      jsonOutput = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("❌ JSON Parse Error:", parseError.message);
      console.error("🔴 Failed to parse:", cleaned.substring(0, 500));
      throw new Error("AI did not return valid JSON format");
    }

    // Validasi dan perbaiki struktur
    jsonOutput = validateAndFixJSON(jsonOutput);

    console.log(
      `✅ Successfully generated ${jsonOutput.questions.length} questions`
    );

    return JSON.stringify(jsonOutput, null, 2);
  } catch (err) {
    console.error("❌ Error generateQuestionGemma:", err.message);
    if (err.response) {
      console.error("📛 Ollama API Error:", err.response.data);
    }
    throw new Error(`Failed to generate questions: ${err.message}`);
  }
};
