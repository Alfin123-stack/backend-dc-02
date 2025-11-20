// controllers/userPreferencesController.js
import {
  fetchUserPreferences,
  updateUserPreferencesService,
} from "../services/userPreferencesService.js";

export const getUserPreferences = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "User ID is required.",
      });
    }

    const data = await fetchUserPreferences(id);

    return res.status(200).json({
      status: "success",
      message: "User preferences retrieved successfully.",
      data,
    });
  } catch (error) {
    console.error("❌ getUserPreferences Error:", error);
    next(error); // Pass error to global handler
  }
};

export const updateUserPreferences = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "User ID is required.",
      });
    }

    const updatedPreferences = await updateUserPreferencesService(id, payload);

    return res.status(200).json({
      status: "success",
      message: "User preferences updated successfully.",
      data: updatedPreferences,
    });
  } catch (error) {
    console.error("❌ updateUserPreferences Error:", error);
    next(error); // Pass error to global handler
  }
};
