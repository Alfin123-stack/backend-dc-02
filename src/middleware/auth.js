import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Jika tidak ada token, gunakan user dummy untuk testing
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = { id: "TEST_USER_ID" };
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // Jika token salah, tetap lolos dengan dummy user
    req.user = { id: "TEST_USER_ID" };
    next();
  }
}
