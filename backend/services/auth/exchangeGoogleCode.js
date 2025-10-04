import qs from "qs";
import axios from "axios";

async function getAccessToken(code) {
  const data = {
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URL,
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post(
      "https://oauth2.googleapis.com/token",
      qs.stringify(data),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );
    return res.data;
  } catch (err) {
    console.error("Error exchanging code:", err.response?.data || err.message);
    throw err;
  }
}

export { getAccessToken };
