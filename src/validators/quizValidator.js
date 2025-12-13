import Joi from "joi";

export const generateQuizSchema = Joi.object({
  tutorialId: Joi.alternatives()
    .try(Joi.number().integer().positive(), Joi.string().trim().min(1))
    .required()
    .messages({
      "any.required": "tutorialId is required",
      "alternatives.match": "tutorialId must be a valid string or number",
    }),

  level: Joi.number().integer().valid(1, 2, 3).required().messages({
    "any.required": "level is required",
    "any.only": "level must be 1, 2, or 3",
  }),
});

export const getTutorialHeadingSchema = Joi.object({
  tutorialId: Joi.alternatives()
    .try(Joi.number().integer().positive(), Joi.string().trim().min(1))
    .required()
    .messages({
      "any.required": "tutorialId is required",
      "alternatives.match": "tutorialId must be a valid string or number",
    }),
});
