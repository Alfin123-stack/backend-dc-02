import express from "express";
import cors from "cors";
import helmet from "helmet";
import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("src", "apidocs.json"), "utf-8")
);

import quizRoutes from "./routes/tutorialRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// ============================================================
// 🔥 FIX CORS WAJIB UNTUK VERCEL SERVERLESS
// ============================================================
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Preflight request
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ============================================================
// 🌐 Middlewares
// ============================================================
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// OPTIONAL CORS (tidak masalah jika tetap ada)
app.use(
  cors({
    origin: ["http://localhost:5173", "https://front-end-dc-02.vercel.app"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ============================================================
// 🩺 Health Check
// ============================================================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server running normally",
  });
});

// ============================================================
// 🛣 Routes
// ============================================================
app.use("/api", quizRoutes);
app.use("/api/users", userRoutes);

// ============================================================
// 📚 Swagger
// ============================================================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ============================================================
// ❌ 404
// ============================================================
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
});

// ============================================================
// 🛠 Global Error Handler
// ============================================================
app.use(errorHandler);

export default app;
