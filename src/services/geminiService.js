// services/quizAIService.js
import genAI from "../config/geminiConfig.js";
import {
  safeJSONParse,
  sanitizeAIOutput,
} from "../utils/gemini/quizSanitizer.js";
import { buildQuizPrompt } from "../utils/gemini/quizPromptBuilder.js";

/**
 * ============================================================
 * 🧠 Generate Quiz From Educational Content (With Level)
 * ============================================================
 * @param {string} htmlContent - Material pembelajaran
 * @param {number} count - Jumlah soal yang di-generate
 * @param {number} level - Level kesulitan (1-3)
 * @returns {Promise<Array>} Parsed clean quiz JSON
 */
export const generateQuizFromContent = async (
  htmlContent,
  count = 3,
  level = 1
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // Ambil prompt sesuai LEVEL
    const prompt = buildQuizPrompt(htmlContent, count, level);

    // Request ke AI
    const result = await model.generateContent(prompt);

    const rawOutput = result?.response?.text() || "";

    // Cleaning AI output
    const sanitizedOutput = sanitizeAIOutput(rawOutput);
    const parsedJSON = safeJSONParse(sanitizedOutput);

    return parsedJSON;
  } catch (err) {
    console.error("❌ Error in generateQuizFromContent:", err);
    throw new Error("Failed to generate quiz from Gemini API");
  }
};
