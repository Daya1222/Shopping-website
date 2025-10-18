import dotenv from "dotenv";
dotenv.config();

import { getAccessToken } from "../../services/auth/exchangeGoogleCode.js";
import verifyGoogleIdToken from "../../services/auth/verifyGIdToken.js";
import { loginOrRegisterGoogleUser } from "../../services/auth/gAuthService.js";

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

function startGauth(req, res) {
    const base = "https://accounts.google.com/o/oauth2/v2/auth";
    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URL,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent",
    });
    try {
        console.log("✅ Gauth initiated");
        res.redirect(`${base}?${params.toString()}`);
    } catch (err) {
        console.log(`error during gauth initiation: ${err}`);
    }
}

async function handleGauthCallback(req, res) {
    const code = req.query.code;
    const tokens = await getAccessToken(code);
    const data = await verifyGoogleIdToken(tokens.id_token);
    const { email, name, picture, email_verified, sub } = data;
    const user = {
        name: name,
        email: email,
        isVerified: email_verified,
        profilePicUrl: picture,
        googleId: sub,
    };
    const responsePayload = await loginOrRegisterGoogleUser(user);
    const token = responsePayload.token;
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 86400000,
    }).redirect(FRONTEND_URL);
}

export { startGauth, handleGauthCallback };
