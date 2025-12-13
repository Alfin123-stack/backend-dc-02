import Joi from "joi";

const baseId = Joi.alternatives()
  .try(Joi.number().integer().positive(), Joi.string().trim().min(1))
  .required();

export const saveQuizCacheSchema = Joi.object({
  tutorialId: baseId.messages({
    "any.required": "tutorialId wajib diisi",
  }),
  userId: baseId.messages({
    "any.required": "userId wajib diisi",
  }),
  level: Joi.number().integer().valid(1, 2, 3).required().messages({
    "any.required": "level wajib diisi",
    "any.only": "level harus 1, 2, atau 3",
  }),
  quiz: Joi.array().min(1).required().messages({
    "any.required": "quiz wajib diisi",
    "array.min": "quiz tidak boleh kosong",
  }),
});

export const saveProgressSchema = Joi.object({
  tutorialId: baseId,
  userId: baseId,
  level: Joi.number().integer().valid(1, 2, 3).required(),
  progress: Joi.object().required().messages({
    "any.required": "progress wajib diisi",
  }),
});

export const getProgressSchema = Joi.object({
  tutorialId: baseId,
  userId: baseId,
  level: Joi.number().integer().valid(1, 2, 3).required(),
});

export const getQuizCacheSchema = Joi.object({
  tutorialId: baseId,
  userId: baseId,
  level: Joi.number().integer().valid(1, 2, 3).required(),
});

export const clearQuizCacheSchema = Joi.object({
  tutorialId: baseId,
  userId: baseId,
  level: Joi.number().integer().valid(1, 2, 3).required(),
  cache: Joi.boolean().optional(),
  progress: Joi.boolean().optional(),
});
