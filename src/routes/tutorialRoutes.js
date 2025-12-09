import express from "express";
import { generateQuiz } from "../controllers/geminiQuizController.js";
import quizCache from "../utils/cache.js";

const router = express.Router();

// Helper bikin key rapi (tambahkan level)
const quizKey = (userId, tutorialId, level) =>
  `quiz_cache:${userId}:${tutorialId}:${level}`;

const progressKey = (userId, tutorialId, level) =>
  `quiz_progress:${userId}:${tutorialId}:${level}`;

/* ======================================================
   1. GENERATE QUIZ (menyimpan quiz_cache di NodeCache)
=======================================================*/
router.post("/quiz/generate", generateQuiz);

/* ======================================================
   2. SAVE PROGRESS (quiz_progress)
=======================================================*/
router.post("/quiz/progress", (req, res) => {
  const { tutorialId, userId, level, progress } = req.body;

  if (!tutorialId || !userId || !level || !progress) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, level, dan progress wajib diisi",
    });
  }

  quizCache.set(progressKey(userId, tutorialId, level), progress);

  return res.json({
    success: true,
    message: "Progress saved",
  });
});

/* ======================================================
   3. GET PROGRESS (quiz_progress)
=======================================================*/
router.get("/quiz/progress", (req, res) => {
  const { tutorialId, userId, level } = req.query;

  if (!tutorialId || !userId || !level) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, dan level wajib",
    });
  }

  const progress = quizCache.get(progressKey(userId, tutorialId, level));

  return res.json({
    success: true,
    progress: progress || null,
  });
});

/* ======================================================
   4. GET QUIZ CACHE (soal quiz)
=======================================================*/
router.get("/quiz/cache", (req, res) => {
  const { tutorialId, userId, level } = req.query;

  if (!tutorialId || !userId || !level) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, dan level wajib",
    });
  }

  const data = quizCache.get(quizKey(userId, tutorialId, level));

  return res.json({
    success: true,
    quizCache: data || null,
  });
});

/* ======================================================
   5. DELETE QUIZ CACHE + PROGRESS
=======================================================*/
router.delete("/quiz/clear", (req, res) => {
  const { tutorialId, userId, level } = req.body;
  const { cache = "true", progress = "true" } = req.query;

  if (!tutorialId || !userId || !level) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, dan level wajib",
    });
  }

  // Convert query to boolean
  const clearCache = cache === "true";
  const clearProgress = progress === "true";

  if (clearCache) quizCache.del(quizKey(userId, tutorialId, level));
  if (clearProgress) quizCache.del(progressKey(userId, tutorialId, level));

  return res.json({
    success: true,
    message: "Quiz cache/progress berhasil dihapus",
  });
});

export default router;
