import User from "../../models/user";

export const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).select("role");

        if (!user || user.role !== "admin") {
            return res.status(403).json({
                error: "Forbidden",
                msg: "Admin access required",
            });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export default isAdmin;
