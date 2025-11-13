import {
    getUserById,
    getAllUsersService,
    updateUserService,
    deleteUserService,
} from "../services/userService.js";

async function getUser(req, res) {
    const { userId } = req.params;
    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({ error: error.message || "Server Error" });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await getAllUsersService();
        res.status(200).json(users);
    } catch (error) {
        console.error("Get all users error:", error);
        res.status(500).json({ error: error.message || "Server Error" });
    }
}

async function updateUser(req, res) {
    const { userId } = req.params;
    const currentUserId = req.user._id;
    const currentUserRole = req.user.role;
    const updates = req.body;

    try {
        if (
            userId !== currentUserId.toString() &&
            currentUserRole !== "admin"
        ) {
            return res
                .status(403)
                .json({ error: "Unauthorized to update this user" });
        }

        const updatedUser = await updateUserService(userId, updates);
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            user: updatedUser,
            msg: "User updated successfully",
        });
    } catch (error) {
        console.error("Update user error:", error);
        res.status(500).json({ error: error.message || "Server Error" });
    }
}

async function deleteUser(req, res) {
    const { userId } = req.params;

    try {
        const result = await deleteUserService(userId);
        if (!result) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            result,
            msg: "User deleted successfully",
        });
    } catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json({ error: error.message || "Server Error" });
    }
}

export { getUser, getAllUsers, updateUser, deleteUser };
