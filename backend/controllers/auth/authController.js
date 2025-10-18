import { registerUser, loginUser } from "../../services/auth/authService.js";

async function register(req, res) {
    try {
        const { error, data } = await registerUser(req.body);

        if (error) return res.status(error).json(data);

        return res.status(200).json(data);
    } catch (err) {
        console.error("Server error during registration:", err);
        return res
            .status(500)
            .json({ msg: "Failed to create user.", error: err.message });
    }
}

async function login(req, res) {
    try {
        const { error, data, token, cookieOptions } = await loginUser(req.body);
        if (error) return res.status(error).json(data);
        return res.cookie("token", token, cookieOptions).status(200).json(data);
    } catch (err) {
        console.error("Server error during login:", err);
        return res.status(500).json({ msg: "Server error." });
    }
}

function logout(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });
    res.json({ msg: "Logged out" });
}

export { register, login, logout };
