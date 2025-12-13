import Joi from "joi";

const baseId = Joi.alternatives()
  .try(Joi.number().integer().positive(), Joi.string().trim().min(1))
  .required();

export const saveHistorySchema = Joi.object({
  tutorialId: baseId.messages({
    "any.required": "tutorialId wajib diisi",
  }),
  level: Joi.number().integer().valid(1, 2, 3).required().messages({
    "any.required": "level wajib diisi",
    "any.only": "level harus 1, 2, atau 3",
  }),
  score: Joi.number().min(0).max(100).required(),
  totalQuestions: Joi.number().integer().positive().required(),
  quizData: Joi.array().min(1).required(),
  userAnswers: Joi.array().required(),
  createdAt: Joi.date().optional(),
});
