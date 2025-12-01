// controllers/quizController.js
import cache from "../utils/cache.js";
import { fetchTutorialById } from "../services/tutorialService.js";
import { generateQuizFromContent } from "../services/geminiService.js";

// ===============================
// GENERATE QUIZ + CACHING
// ===============================
export const generateQuiz = async (req, res, next) => {
  try {
    const userId = req.user.id; // Harus dari auth middleware
    const { tutorialId } = req.body;

    if (!tutorialId) {
      return res.status(400).json({
        success: false,
        message: "tutorialId is required",
      });
    }

    // Cek cache
    const cachedQuiz = cache.get(`quiz_${userId}_${tutorialId}`);
    if (cachedQuiz) {
      return res.status(200).json({
        success: true,
        message: "Quiz loaded from cache",
        fromCache: true,
        ...cachedQuiz,
      });
    }

    // Ambil tutorial
    const tutorial = await fetchTutorialById(tutorialId);
    const content = tutorial?.content || "";

    if (!content.trim()) {
      return res.status(404).json({
        success: false,
        message: "Tutorial content not found.",
      });
    }

    const extractedTitle =
      content.match(/<h2[^>]*>(.*?)<\/h2>/i)?.[1]?.trim() ||
      tutorial.title ||
      `Tutorial ${tutorialId}`;

    // Generate quiz
    const quiz = await generateQuizFromContent(content, 5);

    if (!Array.isArray(quiz) || quiz.length === 0) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate quiz. AI output invalid.",
      });
    }

    const responseData = {
      tutorial: {
        id: tutorialId,
        title: extractedTitle,
      },
      meta: {
        totalQuestions: quiz.length,
        multiple_choice: quiz.filter((q) => q.type === "multiple_choice")
          .length,
        multiple_answer: quiz.filter((q) => q.type === "multiple_answer")
          .length,
      },
      quiz,
    };

    // Simpan ke cache
    cache.set(`quiz_${userId}_${tutorialId}`, responseData);

    return res.status(200).json({
      success: true,
      message: "Quiz generated successfully",
      fromCache: false,
      ...responseData,
    });
  } catch (err) {
    console.error("❌ Error in generateQuiz:", err.message);
    next(err);
  }
};

// ===============================
// RESUME QUIZ
// ===============================
export const resumeQuiz = (req, res) => {
  const userId = req.user.id;
  const { tutorialId } = req.query;

  const data = cache.get(`quiz_${userId}_${tutorialId}`);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "No existing quiz found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Quiz resumed successfully",
    ...data,
  });
};

// ===============================
// FINISH QUIZ
// ===============================
export const finishQuiz = (req, res) => {
  const userId = req.user.id;
  const { tutorialId } = req.body;

  cache.del(`quiz_${userId}_${tutorialId}`);

  return res.status(200).json({
    success: true,
    message: "Quiz finished and deleted",
  });
};