import express from "express";
import {
  generateQuiz,
  resumeQuiz,
  finishQuiz,
} from "../controllers/geminiQuizController.js";

import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// QUIZ ROUTES
router.post("/quiz/generate", authMiddleware, generateQuiz);
router.get("/quiz/resume", authMiddleware, resumeQuiz);
router.delete("/quiz/finish", authMiddleware, finishQuiz);

export default router;
