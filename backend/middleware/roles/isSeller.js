import User from "../../models/user.js";

async function isSeller(req, res, next) {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).select("role");
        if (!user) {
            return res.status(401).json({
                error: "Unauthorized",
                msg: "User not found.",
            });
        }

        if (user.role !== "seller" && user.role !== "admin") {
            return res.status(403).json({
                error: "Forbidden",
                msg: "Only sellers and admins can perform this action.",
            });
        }
        next();
    } catch (e) {
        res.status(500).json({ error: "Server error", e });
    }
}

export default isSeller;
