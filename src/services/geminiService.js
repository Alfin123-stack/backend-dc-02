import genAI from "../config/geminiConfig.js";
import {
  safeJSONParse,
  sanitizeAIOutput,
} from "../utils/gemini/quizSanitizer.js";
import { buildQuizPrompt } from "../utils/gemini/quizPromptBuilder.js";

export const generateQuizFromContent = async (
  htmlContent,
  count = 3,
  level = 1
) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = buildQuizPrompt(htmlContent, count, level);

    const result = await model.generateContent(prompt);

    const rawOutput = result?.response?.text() || "";

    const sanitizedOutput = sanitizeAIOutput(rawOutput);
    const parsedJSON = safeJSONParse(sanitizedOutput);

    return parsedJSON;
  } catch (err) {
    console.error("❌ Error in generateQuizFromContent:", err);
    throw new Error("Failed to generate quiz from Gemini API");
  }
};
