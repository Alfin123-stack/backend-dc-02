export const sanitizeAIOutput = (text = "") => {
  if (typeof text !== "string") return "";

  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
};

export const safeJSONParse = (text) => {
  try {
    const parsed = JSON.parse(text);

    if (!Array.isArray(parsed)) {
      throw new Error("Expected JSON array output");
    }

    return parsed;
  } catch (error) {
    console.error("Failed to parse AI JSON:", error.message);
    console.log("Raw AI Output:\n", text);

    return [
      {
        error: true,
        message: "Failed to parse AI JSON output",
        rawOutput: text,
      },
    ];
  }
};
