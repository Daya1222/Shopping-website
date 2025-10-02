import { Router } from "express";
import { validateEmail } from "../controllers/emailController.js";

const router = Router();

router.post("/validateemail", validateEmail);

export default router;
