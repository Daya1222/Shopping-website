import User from "../models/user.js";

async function isProfileComplete(req, res, next) {
    try {
        const userId = req.user._id;
        const userDoc = await User.findById(userId);

        if (!userDoc) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (!userDoc.isComplete) {
            return res.status(403).json({ msg: "Profile not complete" });
        }

        next();
    } catch (error) {
        console.error("Error in isProfileComplete middleware:", error.message);
        return res.status(500).json({ msg: "Database Error MPC" });
    }
}

export default isProfileComplete;
