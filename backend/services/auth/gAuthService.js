import User from "../../models/user.js";
import { createToken } from "../tokenService.js";

async function loginOrRegisterGoogleUser(payload) {
    const { email, name, googleId, isVerified, profilePicUrl } = payload;

    let user = await User.findOne({ email });

    if (user) {
        const updates = {};

        if (!user.googleId) updates.googleId = googleId;
        if (!user.isVerified && isVerified) updates.isVerified = isVerified;
        if (!user.profilePicUrl && profilePicUrl)
            updates.profilePicUrl = profilePicUrl;
        if (!user.name && name) updates.name = name;

        if (Object.keys(updates).length > 0) {
            Object.assign(user, updates);
            await user.save();
        }
    } else {
        user = await User.create({
            name,
            email,
            googleId,
            isVerified,
            profilePicUrl,
            isComplete: false,
        });
    }

    const token = createToken(user);

    return { user, token };
}

export { loginOrRegisterGoogleUser };
