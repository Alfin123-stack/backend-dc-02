// utils/quizSanitizer.js

/**
 * ============================================================
 * 🧹 sanitizeAIOutput
 * ------------------------------------------------------------
 * Cleans raw AI output by removing markdown code fences
 * and unnecessary formatting before JSON parsing.
 * ============================================================
 *
 * @param {string} text - Raw AI output
 * @returns {string} Cleaned JSON string
 */
export const sanitizeAIOutput = (text = "") => {
  if (typeof text !== "string") return "";

  return text
    .replace(/```json/gi, "") // remove ```json
    .replace(/```/g, "") // remove other fences
    .trim();
};

/**
 * ============================================================
 * 🧩 safeJSONParse
 * ------------------------------------------------------------
 * Safely parses AI output to JSON and provides a structured
 * fallback on failure.
 * ============================================================
 *
 * @param {string} text - Cleaned AI JSON text
 * @returns {Array|Object} Parsed array or structured error
 */
export const safeJSONParse = (text) => {
  try {
    const parsed = JSON.parse(text);

    // Ensure parsed result is an array (expected format)
    if (!Array.isArray(parsed)) {
      throw new Error("Expected JSON array output");
    }

    return parsed;
  } catch (error) {
    console.error("❌ Failed to parse AI JSON:", error.message);
    console.log("📄 Raw AI Output:\n", text);

    return [
      {
        error: true,
        message: "Failed to parse AI JSON output",
        rawOutput: text,
      },
    ];
  }
};
