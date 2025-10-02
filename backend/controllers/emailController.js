// controllers/emailController.js
import { validEmail } from "../services/emailServices.js";
import { emailExists } from "../services/emailServices.js";

export const validateEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const isValid = await validEmail(email);
    if (!isValid) {
      return res.status(400).json({ msg: "Email is invalid" });
    }

    const exists = await emailExists(email);
    if (exists) {
      return res.status(409).json({ msg: "Email already exists" });
    }

    // Email is valid and not taken
    return res.status(200).json({ msg: "Email is valid" });
  } catch (err) {
    console.error("Email validation error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

export default validateEmail;
