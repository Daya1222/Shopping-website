import { verifyToken } from "../tokenService.js";

function getCurrentUser(req) {
  const token = req.cookies.token;
  if (!token) return null;

  try {
    const decoded = verifyToken(token);
    return decoded;
  } catch (err) {
    return null;
  }
}

export default getCurrentUser;
