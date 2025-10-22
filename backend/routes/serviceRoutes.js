import { Router } from "express";
import { validateEmail } from "../controllers/emailController.js";
import getCurrentUser from "../services/user/getCurrentUser.js";

const router = Router();

router.post("/validate-email", validateEmail);
router.get("/get-current-user", async (req, res) => {
    const token = req.cookies.token;
    console.log(token);
    const user = await getCurrentUser(token);
    if (!user) return res.status(401).json({ msg: "Unauthorized" });
    res.status(200).json({ user: user });
});

export default router;
