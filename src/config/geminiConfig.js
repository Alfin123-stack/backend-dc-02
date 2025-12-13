// config/genAI.js
import { config } from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

config();

const { GEMINI_API_KEY } = process.env;

if (!GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in .env");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export default genAI;
