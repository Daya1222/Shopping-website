import jwt from "jsonwebtoken";

function createToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY || "30d",
    });

    return token;
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        return null;
    }
}

export { createToken, verifyToken };
