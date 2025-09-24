const User = require("../models/user.js");
const {
  comparePassword,
  hashPassword,
} = require("../services/passwordService.js");
const { createToken } = require("../services/tokenService.js");

// Register a new user
async function register(req, res) {
  const { name, email, password, role } = req.body;

  try {
    const passwordHash = await hashPassword(password);

    await User.create({
      name,
      email,
      password: passwordHash, // match schema field
      role,
    });

    return res.status(200).json({ msg: "User registered successfully." });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ msg: "Failed to create user." });
  }
}

// Login existing user
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const requiredUser = await User.findOne({ email });
    if (!requiredUser)
      return res.status(401).json({ msg: "Invalid email or password." });

    const isMatch = await comparePassword(password, requiredUser.password);
    if (!isMatch)
      return res.status(401).json({ msg: "Invalid email or password." });

    const token = await createToken(requiredUser);
    return res.status(200).json({ msg: "Login successful.", token });
  } catch (err) {
    console.error("Server error during login:", err);
    return res.status(500).json({ msg: "Server error." });
  }
}

module.exports = { register, login };
