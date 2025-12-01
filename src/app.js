import express from "express";
import cors from "cors";
import helmet from "helmet";
import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("src", "apidocs.json"), "utf-8")
);

import aiRoutes from "./routes/tutorialRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// ============================================================
// 🌐 Global Middlewares
// ============================================================
app.use(helmet()); // Security headers
app.use(cors()); // CORS protection
app.use(express.json()); // JSON body parser
app.use(express.urlencoded({ extended: true })); // Form parser

// ============================================================
// 🩺 Health Check Endpoint
// ============================================================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running normally",
  });
});

// ============================================================
// 🚏 Route Registration
// ============================================================
app.use("/api/", aiRoutes);
app.use("/api/users", userRoutes);

// ============================================================
// 📚 Swagger API Documentation
// ============================================================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ============================================================
// ❌ 404 Not Found Handler
// ============================================================
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
});

// ============================================================
// 🛠️ Global Error Handler (MUST BE LAST)
// ============================================================
app.use(errorHandler);

export default app;
