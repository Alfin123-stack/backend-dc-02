import express from "express";
import helmet from "helmet";
import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("src", "apidocs.json"), "utf-8")
);

import quizRoutes from "./routes/tutorialRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// ===================================================================
// ✅ CORS SUPER STABIL (PAKAI cors + fallback manual)
// ===================================================================
const allowedOrigins = [
  "http://localhost:5173",
  "https://front-end-dc-02-j6lx.vercel.app",
];

// 1️⃣ CORS UTAMA (pakai package cors)
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // untuk Postman / server-side
      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 2️⃣ Fallback manual (untuk memastikan header tetap dikirim)
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ===================================================================
// 🌐 Middlewares
// ===================================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helmet ditempatkan setelah CORS
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// ===================================================================
// 🩺 Health Check
// ===================================================================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server running normally",
  });
});

// ===================================================================
// 🛣 Routes
// ===================================================================
app.use("/api", quizRoutes);
app.use("/api/users", userRoutes);

// ===================================================================
// 📚 Swagger
// ===================================================================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ===================================================================
// ❌ 404 Handler
// ===================================================================
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
});

// ===================================================================
// 🛠 Global Error Handler
// ===================================================================
app.use(errorHandler);

export default app;
