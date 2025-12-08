import express from "express";
import { generateQuiz } from "../controllers/geminiQuizController.js";

import authMiddleware from "../middleware/auth.js";
import quizCache from "../utils/cache.js";

const router = express.Router();

// QUIZ ROUTES
router.post("/quiz/generate", authMiddleware, generateQuiz);

/* -------------------------------------------
   SAVE PROGRESS TO CACHE
--------------------------------------------*/
router.post("/quiz/progress", authMiddleware, (req, res) => {
  const { tutorialId, userId, progress } = req.body;

  if (!tutorialId || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "tutorialId dan userId wajib" });
  }

  const key = `quiz_${tutorialId}_${userId}`;
  quizCache.set(key, progress);

  return res.json({ success: true, message: "Progress saved" });
});

/* -------------------------------------------
   GET PROGRESS FROM CACHE
--------------------------------------------*/
router.get("/quiz/progress", authMiddleware, (req, res) => {
  const { tutorialId, userId } = req.query;

  if (!tutorialId || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "tutorialId dan userId wajib" });
  }

  const key = `quiz_${tutorialId}_${userId}`;
  const progress = quizCache.get(key);

  if (!progress) {
    return res.json({ success: true, progress: null });
  }

  return res.json({ success: true, progress });
});

/* -------------------------------------------
   DELETE PROGRESS FROM CACHE (QUIZ FINISHED)
--------------------------------------------*/
router.delete("/quiz/progress", authMiddleware, (req, res) => {
  const { tutorialId, userId } = req.body;

  if (!tutorialId || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "tutorialId dan userId wajib" });
  }

  const key = `quiz_${tutorialId}_${userId}`;
  quizCache.del(key);

  return res.json({ success: true, message: "Progress deleted" });
});

export default router;
