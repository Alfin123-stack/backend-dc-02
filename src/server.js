// server.js
import dotenv from "dotenv";
import app from "./app.js"; 

dotenv.config();

// ============================================================
// ⚙️ Server Configuration
// ============================================================
const PORT = Number(process.env.PORT) || 3000;

// Validate the port
if (Number.isNaN(PORT)) {
  console.error("❌ Invalid PORT value in .env. Expected a number.");
  process.exit(1);
}

// ============================================================
// 🚀 Start Server
// ============================================================
const server = app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

// ============================================================
// 🛡️ Graceful Error Handling
// ============================================================

// Handle server startup errors (e.g., port already in use)
server.on("error", (err) => {
  console.error("🔥 Server failed to start:", err.message);

  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use.`);
  }

  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  console.error("🚨 Unhandled Rejection:", reason);
});

// Handle uncaught synchronous errors
process.on("uncaughtException", (err) => {
  console.error("🚨 Uncaught Exception:", err);
  process.exit(1);
});
