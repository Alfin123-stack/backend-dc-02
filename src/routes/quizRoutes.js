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
} from "../controllers/quizCacheController.js";

import {
  getHistory,
  saveHistory,
  clearHistory,
} from "../controllers/quizHistoryController.js";
import quizCache from "../utils/cache.js";
import { validateBody, validateQuery } from "../middlewares/validate.js";
import {
  generateQuizSchema,
  getTutorialHeadingSchema,
} from "../validators/quizValidator.js";
import {
  clearQuizCacheSchema,
  getProgressSchema,
  getQuizCacheSchema,
  saveProgressSchema,
  saveQuizCacheSchema,
} from "../validators/quizCacheValidator.js";
import { saveHistorySchema } from "../validators/quizHistoryValidator.js";

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

router.post("/quiz/history", validateBody(saveHistorySchema), saveHistory);

router.delete("/quiz/history/clear", clearHistory);

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
