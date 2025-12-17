import { redis } from "../utils/redis.js";
import { parseIds, progressKey, quizKey, toBool } from "../utils/helper.js";

export const saveQuizCache = async (req, res) => {
  const parsed = parseIds(req.body.tutorialId, req.body.userId, req.body.level);

  if (!parsed || !req.body.quiz) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, level, dan quiz wajib diisi",
    });
  }

  const { tID, uID, lvl } = parsed;
  const key = quizKey(uID, tID, lvl);

  await redis.set(key, req.body.quiz);

  return res.json({
    success: true,
    message: "Quiz cache saved",
  });
};

export const saveProgress = async (req, res) => {
  const parsed = parseIds(req.body.tutorialId, req.body.userId, req.body.level);

  if (!parsed || !req.body.progress) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, level, dan progress wajib diisi",
    });
  }

  const { tID, uID, lvl } = parsed;
  const key = progressKey(uID, tID, lvl);

  await redis.set(key, req.body.progress);

  return res.json({
    success: true,
    message: "Progress saved",
  });
};

export const getProgress = async (req, res) => {
  const parsed = parseIds(
    req.query.tutorialId,
    req.query.userId,
    req.query.level
  );

  if (!parsed) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, dan level wajib",
    });
  }

  const { tID, uID, lvl } = parsed;
  const key = progressKey(uID, tID, lvl);

  const progress = await redis.get(key);

  return res.json({
    success: true,
    progress: progress ?? null,
  });
};

export const getQuizCache = async (req, res) => {
  const parsed = parseIds(
    req.query.tutorialId,
    req.query.userId,
    req.query.level
  );

  if (!parsed) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, dan level wajib",
    });
  }

  const { tID, uID, lvl } = parsed;
  const key = quizKey(uID, tID, lvl);

  const data = await redis.get(key);

  return res.json({
    success: true,
    quizCache: data ?? null,
  });
};

export const clearQuizCache = async (req, res) => {
  const parsed = parseIds(
    req.query.tutorialId,
    req.query.userId,
    req.query.level
  );

  if (!parsed) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, dan level wajib",
    });
  }

  const { tID, uID, lvl } = parsed;

  const clearCache = toBool(req.query.cache ?? "true");
  const clearProgress = toBool(req.query.progress ?? "true");

  const deleted = [];

  if (clearCache) {
    const qKey = quizKey(uID, tID, lvl);
    await redis.del(qKey);
    deleted.push(qKey);
  }

  if (clearProgress) {
    const pKey = progressKey(uID, tID, lvl);
    await redis.del(pKey);
    deleted.push(pKey);
  }

  return res.json({
    success: true,
    message: "Cache & progress berhasil dihapus",
    deleted,
  });
};

export const clearAllCache = async (req, res) => {
  try {
    await redis.flushdb(); // hapus semua key di Redis

    return res.status(200).json({
      success: true,
      message: "Semua cache Redis berhasil dihapus",
    });
  } catch (error) {
    console.error("Redis FLUSH error:", error);

    return res.status(500).json({
      success: false,
      message: "Gagal menghapus semua cache Redis",
    });
  }
};
