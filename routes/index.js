var express = require("express");
var router = express.Router();
const passport = require("passport");
require('dotenv').config();

/* GET home page. */
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "successfully log in",
      user: req.user,
    });
  } else {
    res.status(403).json({ messge: "not Authorised" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "log in failed",
  });
});

router.get("/google",passport.authenticate('google',{scope:['email','profile']}))

router.get('/google/callback',passport.authenticate("google",{
  successRedirect:process.env.CLIENT_URL
}))

router.get('/logout',(req,res)=>{
  req.logout();
  req.redirect(process.env.CLIENT_URL)
})
module.exports = router;
