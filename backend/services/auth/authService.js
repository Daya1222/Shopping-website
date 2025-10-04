import User from "../../models/user.js";
import {
  hashPassword,
  comparePassword,
} from "../../services/passwordService.js";
import { validEmail } from "../emailServices.js";
import { createToken } from "../tokenService.js";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

async function registerUser({ name, email, password, role }) {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return {
      error: 409,
      data: {
        msg: "User already exists",
        name: existingUser.name,
        email: existingUser.email,
      },
    };
  }

  // Validate email
  const isValid = await validEmail(email);
  if (!isValid) {
    return { error: 400, data: { msg: "Email is not valid.", name, email } };
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  await User.create({ name, email, passwordHash });

  return {
    error: null,
    data: {
      msg: "User registered successfully.",
      user: {
        name,
        email,
      },
    },
  };
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) return { error: 401, data: { msg: "Invalid email or password." } };

  const isMatch = await comparePassword(password, user.passwordHash);
  if (!isMatch) return { error: 403, data: { msg: "Invalid password." } };

  const token = createToken(user);

  return {
    error: null,
    data: {
      msg: "Login successful.",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified,
      },
    },
    cookieOptions: {
      token,
      options: {
        httpOnly: true,
        secure: IS_PRODUCTION,
        sameSite: IS_PRODUCTION ? "None" : "Lax",
        maxAge: 24 * 60 * 60 * 1000,
      },
    },
  };
}

export { registerUser, loginUser };
