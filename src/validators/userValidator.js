import Joi from "joi";

export const getUserPreferencesSchema = Joi.object({
  id: Joi.alternatives()
    .try(Joi.number().integer().positive(), Joi.string().trim().min(1))
    .required()
    .messages({
      "any.required": "User ID is required",
      "alternatives.match": "User ID must be a valid string or number",
      "number.base": "User ID must be a number",
      "string.empty": "User ID cannot be empty",
    }),
});
