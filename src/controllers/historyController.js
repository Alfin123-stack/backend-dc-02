// controllers/historyController.js
import quizCache from "../utils/cache.js";

const HISTORY_KEY = "quiz_history";

/* ======================================================
   GET HISTORY (GLOBAL)
=======================================================*/
export const getHistory = (req, res) => {
  const list = quizCache.get(HISTORY_KEY) || [];

  return res.json({
    success: true,
    history: list,
  });
};

/* ======================================================
   SAVE HISTORY (RAW, APA ADANYA)
=======================================================*/
export const saveHistory = (req, res) => {
  const entry = req.body;

  if (!entry || typeof entry !== "object") {
    return res.status(400).json({
      success: false,
      message: "History entry tidak valid",
    });
  }

  // Ambil list lama
  const list = quizCache.get(HISTORY_KEY) || [];

  // Masukkan data apa adanya
  list.unshift(entry);

  // Simpan kembali
  quizCache.set(HISTORY_KEY, list);

  return res.json({
    success: true,
    message: "History saved",
    entry,
  });
};

/* ======================================================
   CLEAR ALL HISTORY
=======================================================*/
export const clearHistory = (req, res) => {
  quizCache.del(HISTORY_KEY);

  return res.json({
    success: true,
    message: "All history cleared",
  });
};
