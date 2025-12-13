import { Router } from "express";
import { getUserPreferences } from "../controllers/userController.js";
import { validateParams } from "../middlewares/validate.js";
import { getUserPreferencesSchema } from "../validators/userValidator.js";

const router = Router();

router.get(
  "/:id/preferences",
  validateParams(getUserPreferencesSchema),
  getUserPreferences
);

export default router;
