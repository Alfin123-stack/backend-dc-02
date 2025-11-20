import express from 'express';
import { generateQuiz } from '../controllers/geminiQuizController.js';

const router = express.Router();

// POST: generate quiz using Gemini
router.post('/generate', generateQuiz);

export default router;


// import express from "express";
// import { generateQuestion } from "../controllers/aiController.js";

// const router = express.Router();

// router.post("/generate", generateQuestion);

// export default router;
