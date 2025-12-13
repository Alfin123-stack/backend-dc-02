import { fetchUserPreferences } from "../services/userPreferencesService.js";

export const getUserPreferences = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await fetchUserPreferences(id);

    return res.status(200).json({
      status: "success",
      message: "User preferences retrieved successfully.",
      data,
    });
  } catch (error) {
    console.error("getUserPreferences Error:", error);
    next(error);
  }
};
