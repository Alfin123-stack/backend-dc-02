// services/tutorialService.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// External API
const BASE_URL = process.env.EXTERNAL_API_BASE || null;

const api = BASE_URL
  ? axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
    })
  : null;

/**
 * ============================================================
 * 📘 Fetch Tutorial by ID
 * Priority:
 * 1. External API (if configured)
 * ============================================================
 */
export const fetchTutorialById = async (tutorialId) => {
  if (!tutorialId) {
    throw new Error("tutorialId is required");
  }

  // 1️⃣ External API (if exists)
  if (api) {
    try {
      const { data } = await api.get(`/api/tutorials/${tutorialId}`);

      // API biasanya return: { status, message, data: {...} }
      if (data?.data) {
        return data.data;
      }

      console.warn("⚠️ External API returned invalid format:", data);
    } catch (err) {
      console.warn("⚠️ External API failed, switching to local JSON fallback");
      console.warn(
        err.response ? `External API Error ${err.response.status}` : err.message
      );
    }
  }
};
