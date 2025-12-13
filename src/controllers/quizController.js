import { generateQuizFromContent } from "../services/geminiService.js";
import { fetchTutorialById } from "../services/tutorialService.js";
import { extractHeading } from "../utils/helper.js";

export const generateQuiz = async (req, res, next) => {
  try {
    const { tutorialId, level } = req.body;

    if (!tutorialId)
      return res
        .status(400)
        .json({ success: false, message: "tutorialId is required" });

    if (![1, 2, 3].includes(level))
      return res.status(400).json({
        success: false,
        message: "level must be 1, 2, or 3",
      });

    const tutorial = await fetchTutorialById(tutorialId);
    const content = tutorial?.content || "";

    if (!content.trim())
      return res.status(404).json({
        success: false,
        message: "Tutorial content not found.",
      });

    const extractedTitle =
      content.match(/<h2[^>]*>(.*?)<\/h2>/i)?.[1]?.trim() ||
      tutorial.title ||
      `Tutorial ${tutorialId}`;

    const quiz = await generateQuizFromContent(content, 3, level);

    if (!Array.isArray(quiz) || quiz.length === 0)
      return res.status(500).json({
        success: false,
        message: "Failed to generate quiz. AI output invalid.",
      });

    return res.status(200).json({
      success: true,
      message: "Quiz generated successfully",
      tutorial: {
        id: tutorialId,
        title: extractedTitle,
      },
      meta: {
        level,
        totalQuestions: quiz.length,
        multiple_choice: quiz.filter((q) => q.type === "multiple_choice")
          .length,
        multiple_answer: quiz.filter((q) => q.type === "multiple_answer")
          .length,
      },
      quiz,
    });
  } catch (err) {
    console.error("Error in generateQuiz:", err.message);
    next(err);
  }
};

export const getTutorialHeading = async (req, res, next) => {
  try {
    const { tutorialId } = req.query;

    if (!tutorialId)
      return res.status(400).json({
        success: false,
        message: "tutorialId is required",
      });

    const tutorial = await fetchTutorialById(tutorialId);

    if (!tutorial)
      return res.status(404).json({
        success: false,
        message: "Tutorial not found",
      });

    const heading = extractHeading(tutorial.content || "");

    return res.status(200).json({
      success: true,
      heading: heading || tutorial.title || `Tutorial ${tutorialId}`,
    });
  } catch (err) {
    console.error("Error in getTutorialHeading:", err.message);
    next(err);
  }
};
