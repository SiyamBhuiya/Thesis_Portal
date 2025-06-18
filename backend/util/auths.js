const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Replace with environment variable in production
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

// Hash password before storing in DB
const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};

// Compare entered password with hashed one from DB
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// Create JWT token (used for sessions or cookies)
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    JWT_SECRET,
    { expiresIn: "1d" } // expires in 1 day
  );
};

// Verify token (optional for protected routes)
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  verifyToken,
};
