// controllers/quizCacheController.js
import quizCache from "../utils/cache.js";

// Helper key
const quizKey = (userId, tutorialId, level) =>
  `quiz_cache:${userId}:${tutorialId}:${level}`;

const progressKey = (userId, tutorialId, level) =>
  `quiz_progress:${userId}:${tutorialId}:${level}`;

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
   DELETE QUIZ CACHE + PROGRESS
=======================================================*/
export const clearQuizCache = (req, res) => {
  const { tutorialId, userId, level } = req.body;
  const { cache = "true", progress = "true" } = req.query;

  if (!tutorialId || !userId || !level) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, dan level wajib",
    });
  }

  const clearCache = cache === "true";
  const clearProgress = progress === "true";

  if (clearCache) quizCache.del(quizKey(userId, tutorialId, level));
  if (clearProgress) quizCache.del(progressKey(userId, tutorialId, level));

  return res.json({
    success: true,
    message: "Quiz cache/progress berhasil dihapus",
  });
};
