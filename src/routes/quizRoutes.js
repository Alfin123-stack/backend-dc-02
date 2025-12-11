import express from "express";
import {
  generateQuiz,
  getTutorialHeading,
} from "../controllers/quizController.js";
import {
  saveProgress,
  getProgress,
  getQuizCache,
  clearQuizCache,
  saveQuizCache, // ⬅ tambahkan import baru
} from "../controllers/quizCacheController.js";
import quizCache from "../utils/cache.js";

const router = express.Router();

/* 1. GENERATE QUIZ */
router.post("/quiz/generate", generateQuiz);

/* 2. SAVE PROGRESS */
router.post("/quiz/progress", saveProgress);

/* 3. GET PROGRESS */
router.get("/quiz/progress", getProgress);

/* 4. GET QUIZ CACHE */
router.get("/quiz/cache", getQuizCache);

/* 5. SAVE QUIZ CACHE (NEW) */
router.post("/quiz/cache", saveQuizCache); // ⬅ route baru

/* 6. CLEAR CACHE */
router.delete("/quiz/clear", clearQuizCache);

/* 7. GET HEADING */
router.get("/tutorial/heading", getTutorialHeading);

router.get("/debug/cache", (req, res) => {
  const keys = quizCache.keys();

  res.json({
    total: keys.length,
    entries: keys.map((key) => ({
      key,
      value: quizCache.get(key),
    })),
  });
});

export default router;
