const auth = require("../config/firebase");
const express = require("express");
const router = express.Router();
const admin=require('firebase-admin')
require("dotenv").config();

const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?prompt=select_account&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}&response_type=code&scope=email%20profile`;
router.get("/", (req, res) => {
  res.status(200).json({ message: "server is running", loginUrl });
});

const verifyGoogleToken = async (idToken) => {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    console.log("User Verified:", decodedToken);
    return decodedToken;
  } catch (error) {
    console.error("Authentication Failed:", error);
    throw error;
  }
};

 
router.post("/google-signin", async (req, res) => {
  try {
    const { idToken } = req.body;
    const credential = auth.GoogleAuthProvider.credential(idToken);
    admin.auth().signInWithCredential(credential)
    .then(userRecord => {
      console.log('User signed in:', userRecord);
      res.status(200).json({ message: 'User signed in successfully', uid: userRecord.uid }); 
  })
    res.status(200).json({ message: "User authenticated", user: userData });
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
});

module.exports = router;
