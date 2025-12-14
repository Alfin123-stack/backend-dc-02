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

import { kv } from "@vercel/kv";
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

import { redis } from "../utils/redis.js";

router.get("/debug/cache", async (req, res) => {
  try {
    const entries = [];
    let cursor = 0;

    do {
      // SCAN redis
      const result = await redis.scan(cursor, {
        match: "*", // bisa ganti: "quiz:*" atau "progress:*"
        count: 50,
      });

      // Upstash return format: { cursor, keys }
      cursor = Number(result.cursor);

      for (const key of result.keys) {
        const value = await redis.get(key);
        entries.push({ key, value });
      }
    } while (cursor !== 0);

    res.json({
      success: true,
      total: entries.length,
      entries,
    });
  } catch (err) {
    console.error("DEBUG REDIS ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
