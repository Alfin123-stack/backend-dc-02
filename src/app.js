import express from "express";
import cors from "cors";
import helmet from "helmet";

import geminiRoutes from "./routes/tutorialRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import gemmaRoutes from "./routes/GemmaRoute.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running normally",
  });
});

// Routes
app.use("/api/ai", geminiRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quiz", gemmaRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;
