// config/genAI.js
import { config } from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load .env variables
config();

// Validate API key early
const { GEMINI_API_KEY } = process.env;

if (!GEMINI_API_KEY) {
  throw new Error("❌ Missing GEMINI_API_KEY in .env");
}

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export default genAI;
