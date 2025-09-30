import User from "../models/user.js";
import { hashPassword, comparePassword } from "../services/passwordService.js";
import validEmail from "../services/emailValidator.js";
import { createToken } from "../services/tokenService.js";

// Register a new user
async function register(req, res) {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const reqUser = await User.findOne({ email });
    if (reqUser) {
      return res.status(409).json({
        msg: "User already exists",
        name: reqUser.name,
        email: reqUser.email,
      });
    }

    const isValidEmail = await validEmail(email);
    if (!isValidEmail) {
      return res.status(400).json({
        msg: "Email is not valid.",
        name: name,
        email: email,
      });
    }

    // Hash the password
    const passwordHash = await hashPassword(password);

    // Create the user
    await User.create({
      name,
      email,
      passwordHash, // Ensure schema expects 'passwordHash'
      role,
    });

    return res.status(201).json({ msg: "User registered successfully." });
  } catch (err) {
    console.error("Database error:", err.message);
    console.error("Full error:", err);
    return res
      .status(500)
      .json({ msg: "Failed to create user.", error: err.message });
  }
}

// Login existing user
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const requiredUser = await User.findOne({ email });
    if (!requiredUser)
      return res.status(401).json({ msg: "Invalid email or password." });

    const isMatch = await comparePassword(password, requiredUser.passwordHash);
    if (!isMatch)
      return res.status(401).json({ msg: "Invalid email or password." });

    const token = createToken(requiredUser);
    return res.status(200).json({ msg: "Login successful.", token });
  } catch (err) {
    console.error("Server error during login:", err);
    return res.status(500).json({ msg: "Server error." });
  }
}

export { register, login };
