import { verifyToken } from "../tokenService.js";
import User from "../../models/user.js";

async function getCurrentUser(token) {
    if (!token) return null;

    try {
        const decoded = verifyToken(token);
        const reqUser = await User.findOne(
            { _id: decoded._id },
            "-passwordHash -__v",
        );
        console.log(reqUser);
        return reqUser;
    } catch (err) {
        return null;
    }
}

export default getCurrentUser;
