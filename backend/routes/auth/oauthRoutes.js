import express from "express";

const router = express.Router();

import {
  startGauth,
  handleGauthCallback,
} from "../../controllers/auth/gauthController.js";

router.get("/google", startGauth);
router.get("/google/callback", handleGauthCallback);

export default router;
