const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const auth = require("../config/firebase");
const firebase = require( 'firebase/app' )
// require( 'firebase/auth' )                            
require("dotenv").config();

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
};

const refreshToken = async ( token ) => {
  try {
      const firebaseToken = await firebase.auth().signInWithCustomToken( token )
      return firebaseToken.user.getIdToken();
  } catch ( error ) {
      console.log( error );
  }
}
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    prompt: "select_account",
  })
);

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false }),
//   (req, res) => {
//     const token = generateToken(req.user);
//     res.json({ success: true, token, user: req.user });
//   }
// );

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),

  async (req, res) => {
    const user = req.user;
    const firetoken = await auth.createCustomToken(user.id);
    refreshToken(firetoken)
    res.json({ message: "Login successful", user: req.user,firetoken });
  }
);

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failed",
  });
});

module.exports = router;
