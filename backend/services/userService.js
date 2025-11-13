import User from "../models/user.js";

async function getUserById(userId) {
    try {
        const user = await User.findById(userId).select("-password");
        return user;
    } catch (error) {
        console.error("Get user by ID error:", error);
        throw new Error(`Database Error: ${error.message}`);
    }
}

async function getAllUsersService() {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });
        return users;
    } catch (error) {
        console.error("Get all users error:", error);
        throw new Error(`Database Error: ${error.message}`);
    }
}

async function updateUserService(userId, updates) {
    try {
        const allowedUpdates = [
            "name",
            "email",
            "phoneNumber",
            "address",
            "profilePicUrl",
            "role",
        ];
        const filteredUpdates = {};
        Object.keys(updates).forEach((key) => {
            if (allowedUpdates.includes(key)) {
                filteredUpdates[key] = updates[key];
            }
        });
        delete filteredUpdates.password;

        const currentUser = await User.findById(userId);

        if (!currentUser) {
            throw new Error("User not found");
        }

        if (filteredUpdates.role) {
            if (filteredUpdates.role === "admin") {
                throw new Error("Cannot set role to admin");
            }
            if (currentUser.role !== "buyer" && currentUser.role !== "seller") {
                throw new Error("Invalid role change");
            }
            if (
                filteredUpdates.role !== "buyer" &&
                filteredUpdates.role !== "seller"
            ) {
                throw new Error(
                    "Can only switch between buyer and seller roles",
                );
            }
        }

        const mergedUser = {
            name:
                filteredUpdates.name !== undefined
                    ? filteredUpdates.name
                    : currentUser.name,
            email:
                filteredUpdates.email !== undefined
                    ? filteredUpdates.email
                    : currentUser.email,
            phoneNumber:
                filteredUpdates.phoneNumber !== undefined
                    ? filteredUpdates.phoneNumber
                    : currentUser.phoneNumber,
            address:
                filteredUpdates.address !== undefined
                    ? filteredUpdates.address
                    : currentUser.address,
        };

        const allFieldsFilled = Object.values(mergedUser).every(
            (field) => field !== null && field !== undefined && field !== "",
        );

        filteredUpdates.isComplete = allFieldsFilled;

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: filteredUpdates },
            { new: true, runValidators: true },
        ).select("-passwordHash");

        return user;
    } catch (error) {
        console.error("Update user error:", error);
        throw new Error(`Database Error: ${error.message}`);
    }
}

async function deleteUserService(userId) {
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return null;
        }
        return { _id: userId, deleted: true };
    } catch (error) {
        console.error("Delete user error:", error);
        throw new Error(`Database Error: ${error.message}`);
    }
}

export {
    getUserById,
    getAllUsersService,
    updateUserService,
    deleteUserService,
};
