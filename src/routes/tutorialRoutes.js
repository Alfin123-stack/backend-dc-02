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

// import express from "express";
// import { generateQuestion } from "../controllers/aiController.js";

// const router = express.Router();

// router.post("/generate", generateQuestion);

// export default router;
