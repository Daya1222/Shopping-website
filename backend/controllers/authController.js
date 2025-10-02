import { registerUser, loginUser } from "../services/authService.js";

async function register(req, res) {
  try {
    const { error, data } = await registerUser(req.body);

    if (error) return res.status(error).json(data);

    return res.status(201).json(data);
  } catch (err) {
    console.error("Server error during registration:", err);
    return res
      .status(500)
      .json({ msg: "Failed to create user.", error: err.message });
  }
}

async function login(req, res) {
  try {
    const { error, data, cookieOptions } = await loginUser(req.body);

    if (error) return res.status(error).json(data);

    return res
      .cookie(cookieOptions.token, cookieOptions.options)
      .status(200)
      .json(data);
  } catch (err) {
    console.error("Server error during login:", err);
    return res.status(500).json({ msg: "Server error." });
  }
}

export { register, login };
