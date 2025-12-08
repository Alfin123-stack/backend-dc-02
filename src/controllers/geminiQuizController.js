// controllers/quizController.js
import { fetchTutorialById } from "../services/tutorialService.js";
import { generateQuizFromContent } from "../services/geminiService.js";

// ===============================
// GENERATE QUIZ (NO CACHE)
// ===============================
export const generateQuiz = async (req, res, next) => {
  try {
    const { tutorialId } = req.body;

    if (!tutorialId) {
      return res.status(400).json({
        success: false,
        message: "tutorialId is required",
      });
    }

    // Ambil tutorial langsung dari DB
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

    return res.status(200).json({
      success: true,
      message: "Quiz generated successfully",
      ...responseData,
    });
  } catch (err) {
    console.error("❌ Error in generateQuiz:", err.message);
    next(err);
  }
};

// ===============================
// RESUME QUIZ (HAPUS CACHE → AUTO FAIL)
// Bisa kamu ubah untuk load progress dari DB jika perlu
// ===============================
export const resumeQuiz = (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Resume quiz is disabled because caching was removed.",
  });
};

// ===============================
// FINISH QUIZ (NO CACHE TO DELETE)
// ===============================
export const finishQuiz = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Quiz finished (no cache used).",
  });
};
