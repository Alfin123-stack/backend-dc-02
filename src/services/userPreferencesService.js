// services/userPreferencesService.js

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.EXTERNAL_API_BASE;

if (!BASE_URL) {
  throw new Error("Missing required environment variable: EXTERNAL_API_BASE");
}

/**
 * Axios instance for external API calls
 */
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

/**
 * ============================================================
 * 🔧 Format Axios Errors to Standard Error Object
 * ============================================================
 */
const formatAxiosError = (error, defaultMessage) => {
  if (error.response) {
    const status = error.response.status;
    const message =
      error.response.data?.message || `${defaultMessage} (${status})`;

    const err = new Error(message);
    err.status = status;
    return err;
  }

  if (error.request) {
    const err = new Error("No response received from external server");
    err.status = 503;
    return err;
  }

  const err = new Error(error.message || defaultMessage);
  err.status = 500;
  return err;
};

/**
 * ============================================================
 * 📘 Fetch User Preferences
 * ============================================================
 * @param {string|number} userId - User ID
 * @returns {Promise<Object|null>}
 */
export const fetchUserPreferences = async (userId) => {
  try {
    if (!userId) {
      throw new Error("userId is required");
    }

    const response = await api.get(`/api/users/${userId}/preferences`);

    return response.data?.data || null;
  } catch (error) {
    throw formatAxiosError(error, "Failed to fetch user preferences");
  }
};

/**
 * ============================================================
 * ✏️ Update User Preferences
 * ============================================================
 * @param {string|number} userId - User ID
 * @param {Object} payload - Updated preference data
 * @returns {Promise<Object|null>}
 */
export const updateUserPreferencesService = async (userId, payload) => {
  try {
    if (!userId) {
      throw new Error("userId is required");
    }

    if (!payload || typeof payload !== "object") {
      throw new Error("payload must be a valid object");
    }

    const response = await api.patch(
      `/api/users/${userId}/preferences`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data?.data || null;
  } catch (error) {
    throw formatAxiosError(error, "Failed to update user preferences");
  }
};
