export default function errorHandler(err, req, res) {
  console.error("ERROR:", err);

  const status = err.status || 500;
  const message = err.message || "An unexpected server error occurred.";

  res.status(status).json({
    status: "error",
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
