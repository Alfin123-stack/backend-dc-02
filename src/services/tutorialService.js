// services/tutorialService.js
import axios from "axios";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// ES Module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load local tutorials.json
const tutorialsPath = path.join(__dirname, "../data/tutorials.json");
const localTutorials = JSON.parse(readFileSync(tutorialsPath, "utf-8"));

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
 * 2. Local tutorials.json
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

  // 2️⃣ Local JSON fallback
  const tutorial = localTutorials.find(
    (t) => Number(t.id) === Number(tutorialId)
  );

  if (!tutorial) {
    throw new Error(
      `Tutorial with ID ${tutorialId} not found (external + local failed)`
    );
  }

  console.log("✅ Local fallback tutorial selected:", tutorial.title);

  return tutorial;
};
