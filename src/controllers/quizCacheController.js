// controllers/quizCacheController.js
import quizCache from "../utils/cache.js";

// === KEY HELPERS (CONSISTENT) ===
const quizKey = (userId, tutorialId, level) =>
  `quiz_cache:u${userId}:t${tutorialId}:l${level}`;

const progressKey = (userId, tutorialId, level) =>
  `quiz_progress:u${userId}:t${tutorialId}:l${level}`;

// === PARSE NUMBER ===
const toInt = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.floor(n) : null;
};

/* ======================================================
   SAVE QUIZ CACHE
======================================================*/
export const saveQuizCache = (req, res) => {
  const { tutorialId, userId, level, quiz } = req.body;

  const tId = toInt(tutorialId);
  const uId = toInt(userId);
  const lvl = toInt(level);

  if (!tId || !uId || !lvl || !quiz) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, level, dan quiz wajib diisi.",
    });
  }

  const key = quizKey(uId, tId, lvl);
  quizCache.set(key, quiz);

  return res.json({ success: true, key, message: "Quiz cache saved." });
};

/* ======================================================
   SAVE PROGRESS
======================================================*/
export const saveProgress = (req, res) => {
  const { tutorialId, userId, level, progress } = req.body;

  const tId = toInt(tutorialId);
  const uId = toInt(userId);
  const lvl = toInt(level);

  if (!tId || !uId || !lvl || !progress) {
    return res.status(400).json({
      success: false,
      message: "tutorialId, userId, level, dan progress wajib diisi.",
    });
  }

  const canonical = {
    currentQuestion: progress.currentQuestion ?? 0,
    userAnswers: Array.isArray(progress.userAnswers)
      ? progress.userAnswers
      : [],
    submittedState: progress.submittedState ?? {},
    timeLeft: typeof progress.timeLeft === "number" ? progress.timeLeft : 0,
    updatedAt: new Date().toISOString(),
  };

  const key = progressKey(uId, tId, lvl);
  quizCache.set(key, canonical);

  return res.json({ success: true, key, progress: canonical });
};

/* ======================================================
   GET PROGRESS
======================================================*/
export const getProgress = (req, res) => {
  const tId = toInt(req.query.tutorialId);
  const uId = toInt(req.query.userId);
  const lvl = toInt(req.query.level);

  if (!tId || !uId || !lvl) {
    return res
      .status(400)
      .json({ success: false, message: "Parameter kurang." });
  }

  const key = progressKey(uId, tId, lvl);
  const progress = quizCache.get(key) || null;

  return res.json({ success: true, key, progress });
};

/* ======================================================
   GET QUIZ CACHE
======================================================*/
export const getQuizCache = (req, res) => {
  const tId = toInt(req.query.tutorialId);
  const uId = toInt(req.query.userId);
  const lvl = toInt(req.query.level);

  if (!tId || !uId || !lvl) {
    return res
      .status(400)
      .json({ success: false, message: "Parameter kurang." });
  }

  const key = quizKey(uId, tId, lvl);
  const quizData = quizCache.get(key) || null;

  return res.json({ success: true, key, quizCache: quizData });
};

/* ======================================================
   CLEAR QUIZ CACHE (SAFE & EXACT)
======================================================*/
export const clearQuizCache = (req, res) => {
  const tId = toInt(req.body.tutorialId);
  const uId = toInt(req.body.userId);
  const lvl = toInt(req.body.level);

  const clearC = req.query.cache === "true";
  const clearP = req.query.progress === "true";

  if (!tId || !uId || !lvl) {
    return res
      .status(400)
      .json({ success: false, message: "Parameter kurang." });
  }

  const kCache = quizKey(uId, tId, lvl);
  const kProg = progressKey(uId, tId, lvl);
  const deleted = [];

  if (clearC && quizCache.has(kCache)) {
    quizCache.del(kCache);
    deleted.push(kCache);
  }

  if (clearP && quizCache.has(kProg)) {
    quizCache.del(kProg);
    deleted.push(kProg);
  }

  return res.json({
    success: true,
    deleted,
    message: "Cache/progress berhasil dihapus.",
  });
};
