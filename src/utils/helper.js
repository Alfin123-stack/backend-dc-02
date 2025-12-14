// utils/extractHeading.js
export const extractHeading = (html = "") => {
  if (!html) return null;

  const headingMatch =
    html.match(/<h1[^>]*>(.*?)<\/h1>/i) ||
    html.match(/<h2[^>]*>(.*?)<\/h2>/i) ||
    html.match(/<h3[^>]*>(.*?)<\/h3>/i);

  return headingMatch?.[1]?.trim() || null;
};

export const quizKey = (userId, tutorialId, level) =>
  `quiz_cache:${userId}:${tutorialId}:${level}`;

export const progressKey = (userId, tutorialId, level) =>
  `quiz_progress:${userId}:${tutorialId}:${level}`;

export const toBool = (v) => {
  if (v === true) return true;
  if (v === "true") return true;
  if (v === 1 || v === "1") return true;
  return false;
};

export const parseIds = (tutorialId, userId, level) => {
  const tID = Number(tutorialId);
  const uID = Number(userId);
  const lvl = Number(level);

  if ([tID, uID, lvl].some(Number.isNaN)) {
    return null;
  }

  return { tID, uID, lvl };
};
