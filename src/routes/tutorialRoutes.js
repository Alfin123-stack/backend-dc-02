import express from "express";
import { generateQuiz } from "../controllers/geminiQuizController.js";
import authMiddleware from "../middleware/auth.js";
import quizCache from "../utils/cache.js";

const router = express.Router();

// Helper bikin key rapi
const quizKey = (userId, tutorialId) => `quiz_cache:${userId}:${tutorialId}`;
const progressKey = (userId, tutorialId) =>
  `quiz_progress:${userId}:${tutorialId}`;

/* ======================================================
   1. GENERATE QUIZ (menyimpan quiz_cache di NodeCache)
=======================================================*/
router.post("/quiz/generate", authMiddleware, generateQuiz);

/* ======================================================
   2. SAVE PROGRESS (quiz_progress)
=======================================================*/
router.post("/quiz/progress", authMiddleware, (req, res) => {
  const { tutorialId, userId, progress } = req.body;

  if (!tutorialId || !userId || !progress) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, dan progress wajib diisi",
    });
  }

  const key = progressKey(userId, tutorialId);
  quizCache.set(key, progress);

  return res.json({
    success: true,
    message: "Progress saved",
  });
});

/* ======================================================
   3. GET PROGRESS (quiz_progress)
=======================================================*/
router.get("/quiz/progress", authMiddleware, (req, res) => {
  const { tutorialId, userId } = req.query;

  if (!tutorialId || !userId) {
    return res.status(400).json({
      success: false,
      message: "tutorialId dan userId wajib",
    });
  }

  const key = progressKey(userId, tutorialId);
  const progress = quizCache.get(key);

  return res.json({
    success: true,
    progress: progress || null,
  });
});

/* ======================================================
   4. GET QUIZ CACHE (soal quiz)
=======================================================*/
router.get("/quiz/cache", authMiddleware, (req, res) => {
  const { tutorialId, userId } = req.query;

  if (!tutorialId || !userId) {
    return res.status(400).json({
      success: false,
      message: "tutorialId dan userId wajib",
    });
  }

  const key = quizKey(userId, tutorialId);
  const data = quizCache.get(key);

  return res.json({
    success: true,
    quizCache: data || null,
  });
});

/* ======================================================
   5. DELETE QUIZ CACHE + PROGRESS (ketika quiz selesai)
=======================================================*/
router.delete("/quiz/clear", authMiddleware, (req, res) => {
  const { tutorialId, userId } = req.body;

  if (!tutorialId || !userId) {
    return res.status(400).json({
      success: false,
      message: "tutorialId dan userId wajib",
    });
  }

  quizCache.del(quizKey(userId, tutorialId)); // hapus soal
  quizCache.del(progressKey(userId, tutorialId)); // hapus progress

  return res.json({
    success: true,
    message: "Quiz cache & progress deleted",
  });
});

export default router;
