import quizCache from "../utils/cache.js";

const HISTORY_KEY = "quiz_history";

export const getHistory = (req, res) => {
  const list = quizCache.get(HISTORY_KEY) || [];

  return res.json({
    success: true,
    history: list,
  });
};

export const saveHistory = (req, res) => {
  const entry = {
    ...req.body,
    createdAt: req.body.createdAt || new Date().toISOString(),
  };

  const list = quizCache.get(HISTORY_KEY) || [];

  list.unshift(entry);

  quizCache.set(HISTORY_KEY, list);

  return res.json({
    success: true,
    message: "History saved",
    entry,
  });
};

export const clearHistory = (req, res) => {
  quizCache.del(HISTORY_KEY);

  return res.json({
    success: true,
    message: "All history cleared",
  });
};
