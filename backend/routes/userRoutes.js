import express from "express";
import authorize from "../middleware/authorize.js";
import isAdmin from "../middleware/roles/isAdmin.js";
import {
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
} from "../controllers/userController.js";

const router = express.Router();
router.get("/", authorize, getAllUsers);
router.get("/:userId", authorize, getUser);
router.patch("/:userId", authorize, updateUser);

router.delete("/:userId", authorize, isAdmin, deleteUser);

export default router;
