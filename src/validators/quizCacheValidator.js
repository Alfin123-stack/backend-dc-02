import Joi from "joi";

const baseId = Joi.alternatives()
  .try(Joi.number().integer().positive(), Joi.string().trim().min(1))
  .required();

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

export const clearQuizCacheSchema = Joi.object({
  tutorialId: baseId,
  userId: baseId,
  level: Joi.number().integer().valid(1, 2, 3).required(),
  cache: Joi.boolean().optional(),
  progress: Joi.boolean().optional(),
});
