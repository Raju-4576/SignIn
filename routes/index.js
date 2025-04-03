var express = require("express");
var router = express.Router();
const fireAuth=require('./fireRoute')
const passAuth=require('./auth')


router.use('/',fireAuth)
router.use('/auth',passAuth)
// const generateToken = (user) => {
//   return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
//   });
// };

// router.get("/login/success", (req, res) => {
//   res.status(403).json({ error: true, message: "Use JWT for authentication" });
// });

// router.get("/login/failed", (req, res) => {
//   res.status(401).json({
//     error: true,
//     message: "Log in failed",
//   });
// });

// router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false }),
//   (req, res) => {
//     const token = generateToken(req.user);
//     res.json({ success: true, token });
//   }
// );

// router.get("/logout", (req, res) => {
//   res.json({ success: true, message: "Logout handled on frontend, remove token" });
// });

module.exports = router;
