import { Router } from "express";
import { validateEmail } from "../controllers/emailController.js";
import getCurrentUser from "../services/user/getCurrentUser.js";

const router = Router();

router.post("/validate-email", validateEmail);
router.get("/get-current-user", (req, res) => {
  const user = getCurrentUser(req);
  if (!user) return res.status(200).json({ user: null });
  res.status(200).json({ user: user });
});

export default router;
