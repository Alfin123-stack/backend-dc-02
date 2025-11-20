// services/quizAIService.js
import genAI from "../config/geminiConfig.js";
import {
  safeJSONParse,
  sanitizeAIOutput,
} from "../utils/gemini/quizSanitizer.js";
import { buildQuizPrompt } from "../utils/gemini/quizPromptBuilder.js";

/**
 * ============================================================
 * 🧠 Generate Quiz From Educational Content
 * ============================================================
 * @param {string} htmlContent - The learning material (plain text or HTML)
 * @param {number} count - Number of quiz items to generate
 * @returns {Promise<Array>} Parsed clean quiz JSON
 */
export const generateQuizFromContent = async (htmlContent, count = 5) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // Build the full prompt
    const prompt = buildQuizPrompt(htmlContent, count);

    // Request generation
    const result = await model.generateContent(prompt);

    const rawOutput = result?.response?.text() || "";

    // Clean and parse AI output
    const sanitizedOutput = sanitizeAIOutput(rawOutput);
    const parsedJSON = safeJSONParse(sanitizedOutput);

    return parsedJSON;
  } catch (err) {
    console.error("❌ Error in generateQuizFromContent:", err);
    throw new Error("Failed to generate quiz from Gemini API");
  }
};
