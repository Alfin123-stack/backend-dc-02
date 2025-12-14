import { redis } from "../utils/redis.js";

const HISTORY_KEY = "quiz_history";

/* ===============================
   GET HISTORY
=============================== */
export const getHistory = async (req, res) => {
  const list = await redis.get(HISTORY_KEY);

  return res.json({
    success: true,
    history: list || [],
  });
};

/* ===============================
   SAVE HISTORY
=============================== */
export const saveHistory = async (req, res) => {
  const entry = {
    ...req.body,
    createdAt: req.body.createdAt || new Date().toISOString(),
  };

  const list = (await redis.get(HISTORY_KEY)) || [];

  list.unshift(entry);

  await redis.set(HISTORY_KEY, list);

  return res.json({
    success: true,
    message: "History saved",
    entry,
  });
};

/* ===============================
   CLEAR HISTORY
=============================== */
export const clearHistory = async (req, res) => {
  await redis.del(HISTORY_KEY);

  return res.json({
    success: true,
    message: "All history cleared",
  });
};
