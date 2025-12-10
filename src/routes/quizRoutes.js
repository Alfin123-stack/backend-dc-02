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
} from "../controllers/quizCacheController.js";

const router = express.Router();

/* 1. GENERATE QUIZ */
router.post("/quiz/generate", generateQuiz);

/* 2. SAVE PROGRESS */
router.post("/quiz/progress", saveProgress);

/* 3. GET PROGRESS */
router.get("/quiz/progress", getProgress);

/* 4. GET QUIZ CACHE */
router.get("/quiz/cache", getQuizCache);

/* 5. CLEAR CACHE */
router.delete("/quiz/clear", clearQuizCache);

/* 6. GET HEADING */
router.get("/tutorial/heading", getTutorialHeading);

export default router;
