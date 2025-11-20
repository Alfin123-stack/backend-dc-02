// routes/userRoutes.js
import { Router } from "express";
import {
  getUserPreferences,
  updateUserPreferences,
} from "../controllers/userController.js";

const router = Router();

/**
 * @route   GET /api/users/:id/preferences
 * @desc    Get user preferences
 */
router.get("/:id/preferences", getUserPreferences);

/**
 * @route   PATCH /api/users/:id/preferences
 * @desc    Update user preferences
 */
router.patch("/:id/preferences", updateUserPreferences);

export default router;
