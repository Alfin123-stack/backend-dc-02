import express from "express";
import { generateQuiz } from "../controllers/geminiQuizController.js";
import quizCache from "../utils/cache.js";

const router = express.Router();

// Helper bikin key rapi
const quizKey = (userId, tutorialId) => `quiz_cache:${userId}:${tutorialId}`;
const progressKey = (userId, tutorialId) =>
  `quiz_progress:${userId}:${tutorialId}`;

/* ======================================================
   1. GENERATE QUIZ (menyimpan quiz_cache di NodeCache)
=======================================================*/
router.post("/quiz/generate", async (req, res) => {
  try {
    await generateQuiz(req, res);
  } catch (err) {
    console.error("Error generate quiz:", err);
    return res.status(500).json({
      success: false,
      message: "Gagal generate quiz",
    });
  }
});

/* ======================================================
   2. SAVE PROGRESS (quiz_progress)
=======================================================*/
router.post("/quiz/progress", (req, res) => {
  const { tutorialId, userId, progress } = req.body;

  if (!tutorialId || !userId || !progress) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, dan progress wajib diisi",
    });
  }

  quizCache.set(progressKey(userId, tutorialId), progress);

  return res.json({
    success: true,
    message: "Progress saved",
  });
});

/* ======================================================
   3. GET PROGRESS (quiz_progress)
=======================================================*/
router.get("/quiz/progress", (req, res) => {
  const { tutorialId, userId } = req.query;

  if (!tutorialId || !userId) {
    return res.status(400).json({
      success: false,
      message: "tutorialId dan userId wajib",
    });
  }

  const progress = quizCache.get(progressKey(userId, tutorialId));

  return res.json({
    success: true,
    progress: progress || null,
  });
});

/* ======================================================
   4. GET QUIZ CACHE (soal quiz)
=======================================================*/
router.get("/quiz/cache", (req, res) => {
  const { tutorialId, userId } = req.query;

  if (!tutorialId || !userId) {
    return res.status(400).json({
      success: false,
      message: "tutorialId dan userId wajib",
    });
  }

  const data = quizCache.get(quizKey(userId, tutorialId));

  return res.json({
    success: true,
    quizCache: data || null,
  });
});

/* ======================================================
   5. DELETE QUIZ CACHE + PROGRESS
=======================================================*/
router.delete("/quiz/clear", (req, res) => {
  const { tutorialId, userId } = req.body;

  if (!tutorialId || !userId) {
    return res.status(400).json({
      success: false,
      message: "tutorialId dan userId wajib",
    });
  }

  quizCache.del(quizKey(userId, tutorialId));
  quizCache.del(progressKey(userId, tutorialId));

  return res.json({
    success: true,
    message: "Quiz cache & progress deleted",
  });
});

export default router;
