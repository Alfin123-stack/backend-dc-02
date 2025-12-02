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
// 🔥 CORS WAJIB (VERSI BENAR UNTUK VERCEL)
// ============================================================
const allowedOrigins = [
  "http://localhost:5173",
  "https://front-end-dc-02.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked: " + origin));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Preflight
app.options("*", cors());

// ============================================================
// 🌐 Middlewares
// ============================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Pasang helmet SETELAH CORS
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
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
