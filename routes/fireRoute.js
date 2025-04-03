const auth = require("../config/firebase");
const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}&response_type=code&scope=email%20profile`;
router.get("/", (req, res) => {
  res.status(200).json({ message: "server is running", loginUrl });
});

router.post("/auth/google", async (req, res) => {
  try {
    const { code } = req.query;
    if (!code)
      return res.status(400).json({ error: "Missing authorization code" });

    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }
    );

    const { id_token } = tokenResponse.data;

    const decodedToken = await auth.verifyIdToken(id_token);
    return res.json({ message: "Login successful", user: decodedToken });
  } catch (error) {
    console.error("OAuth Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Authentication failed" });
  }
});

module.exports = router;
