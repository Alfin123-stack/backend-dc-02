import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.EXTERNAL_API_BASE || null;

const api = BASE_URL
  ? axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
    })
  : null;

export const fetchTutorialById = async (tutorialId) => {
  if (!tutorialId) {
    throw new Error("tutorialId is required");
  }

  if (api) {
    try {
      const { data } = await api.get(`/api/tutorials/${tutorialId}`);

      if (data?.data) {
        return data.data;
      }

      console.warn("External API returned invalid format:", data);
    } catch (err) {
      console.warn("External API failed, switching to local JSON fallback");
      console.warn(
        err.response ? `External API Error ${err.response.status}` : err.message
      );
    }
  }
};
