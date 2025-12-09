import {
  buildQuizPromptLevel1,
  buildQuizPromptLevel2,
  buildQuizPromptLevel3,
} from "./quizPromptLevels.js";

export const buildQuizPrompt = (htmlContent, count, level) => {
  switch (level) {
    case 1:
      return buildQuizPromptLevel1(htmlContent, count);
    case 2:
      return buildQuizPromptLevel2(htmlContent, count);
    case 3:
      return buildQuizPromptLevel3(htmlContent, count);
    default:
      return buildQuizPromptLevel1(htmlContent, count); // fallback
  }
};
