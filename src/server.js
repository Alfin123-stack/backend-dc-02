import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

if (Number.isNaN(PORT)) {
  console.error("Invalid PORT value in .env. Expected a number.");
  process.exit(1);
}

const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

server.on("error", (err) => {
  console.error("Server failed to start:", err.message);

  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use.`);
  }

  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
