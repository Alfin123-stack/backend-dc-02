// routes/userRoutes.js
import { Router } from "express";
import { getUserPreferences } from "../controllers/userController.js";

const router = Router();

/**
 * @route   GET /api/users/:id/preferences
 * @desc    Get user preferences
 */
router.get("/:id/preferences", getUserPreferences);

export default router;
