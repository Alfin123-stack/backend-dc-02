// controllers/quizCacheController.js
import quizCache from "../utils/cache.js";

// Helper key
const quizKey = (userId, tutorialId, level) =>
  `quiz_cache:${userId}:${tutorialId}:${level}`;

const progressKey = (userId, tutorialId, level) =>
  `quiz_progress:${userId}:${tutorialId}:${level}`;

// Helper convert bool
const toBool = (v) => {
  if (v === true) return true;
  if (v === "true") return true;
  if (v === 1 || v === "1") return true;
  return false;
};

/* ======================================================
   SAVE QUIZ CACHE
=======================================================*/
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

/* ======================================================
   SAVE PROGRESS
=======================================================*/
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

/* ======================================================
   GET PROGRESS
=======================================================*/
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

/* ======================================================
   GET QUIZ CACHE
=======================================================*/
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

/* ======================================================
   DELETE QUIZ CACHE + PROGRESS (FINAL FIX)
=======================================================*/
export const clearQuizCache = (req, res) => {
  // DELETE body tidak reliable → pakai query semua
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

  // Pattern key
  const pattern = `${userId}:${tutorialId}:${level}`;

  const allKeys = quizCache.keys();
  const targetKeys = allKeys.filter((key) => key.includes(pattern));

  targetKeys.forEach((key) => {
    if (clearCache && key.includes("quiz_cache")) {
      quizCache.del(key);
    }
    if (clearProgress && key.includes("quiz_progress")) {
      quizCache.del(key);
    }
  });

  return res.json({
    success: true,
    message: "Semua cache/progress level ini berhasil dihapus",
    deleted: targetKeys,
  });
};
