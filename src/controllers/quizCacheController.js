import quizCache from "../utils/cache.js";
import { progressKey, quizKey, toBool } from "../utils/helper.js";

export const saveQuizCache = (req, res) => {
  const { tutorialId, userId, level, quiz } = req.body;

  if (!tutorialId || !userId || !level || !quiz) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, level, dan quiz wajib diisi",
    });
  }

  quizCache.set(quizKey(userId, tutorialId, level), quiz);

  return res.json({
    success: true,
    message: "Quiz cache saved",
  });
};

export const saveProgress = (req, res) => {
  const { tutorialId, userId, level, progress } = req.body;

  if (!tutorialId || !userId || !level || !progress) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, level, dan progress wajib diisi",
    });
  }

  quizCache.set(progressKey(userId, tutorialId, level), progress);

  return res.json({
    success: true,
    message: "Progress saved",
  });
};

export const getProgress = (req, res) => {
  const { tutorialId, userId, level } = req.query;

  if (!tutorialId || !userId || !level) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, dan level wajib",
    });
  }

  const progress = quizCache.get(progressKey(userId, tutorialId, level));

  return res.json({
    success: true,
    progress: progress || null,
  });
};

export const getQuizCache = (req, res) => {
  const { tutorialId, userId, level } = req.query;

  if (!tutorialId || !userId || !level) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, dan level wajib",
    });
  }

  const data = quizCache.get(quizKey(userId, tutorialId, level));

  return res.json({
    success: true,
    quizCache: data || null,
  });
};

export const clearQuizCache = (req, res) => {
  const {
    tutorialId,
    userId,
    level,
    cache = "true",
    progress = "true",
  } = req.query;

  if (!tutorialId || !userId || !level) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, dan level wajib",
    });
  }

  const clearCache = toBool(cache);
  const clearProgress = toBool(progress);

  // EXACT KEY
  const qKey = quizKey(userId, tutorialId, level);
  const pKey = progressKey(userId, tutorialId, level);

  const deleted = [];

  if (clearCache && quizCache.has(qKey)) {
    quizCache.del(qKey);
    deleted.push(qKey);
  }

  if (clearProgress && quizCache.has(pKey)) {
    quizCache.del(pKey);
    deleted.push(pKey);
  }

  return res.json({
    success: true,
    message: "Cache & progress berhasil dihapus",
    deleted,
  });
};
