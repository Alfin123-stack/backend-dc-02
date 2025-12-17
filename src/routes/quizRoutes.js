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
  saveQuizCache,
  clearAllCache,
} from "../controllers/quizCacheController.js";

import {
  getHistory,
  saveHistory,
  clearHistory,
} from "../controllers/quizHistoryController.js";

import { validateBody, validateQuery } from "../middlewares/validate.js";
import {
  generateQuizSchema,
  getTutorialHeadingSchema,
} from "../validators/quizValidator.js";
import {
  clearQuizCacheSchema,
  getProgressSchema,
  saveProgressSchema,
} from "../validators/quizCacheValidator.js";

const router = express.Router();

router.post("/quiz/generate", validateBody(generateQuizSchema), generateQuiz);

router.get(
  "/tutorial/heading",
  validateQuery(getTutorialHeadingSchema),
  getTutorialHeading
);

router.post("/quiz/progress", validateBody(saveProgressSchema), saveProgress);

router.get("/quiz/progress", validateQuery(getProgressSchema), getProgress);

router.get("/quiz/cache", getQuizCache);

router.post("/quiz/cache", saveQuizCache);

router.delete(
  "/quiz/clear",
  validateQuery(clearQuizCacheSchema),
  clearQuizCache
);

router.get("/quiz/history", getHistory);

router.post("/quiz/history", saveHistory);

router.delete("/quiz/history/clear", clearHistory);

router.delete("/quiz/cache/clear-all", clearAllCache);

export default router;
