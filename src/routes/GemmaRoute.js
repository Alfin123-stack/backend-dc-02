import express from "express";
import { generateQuestion } from "../controllers/gemmaQuizController.js";

const router = express.Router();

// POST: generate quiz using Gemma (local model)
router.post("/generate", generateQuestion);

export default router;
