const passport = require("passport");
const express = require("express");
const app = express();
const auth = require("./firebase");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../model/user");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
     
      try {
        let user = await User.findOne({ googleId: profile.id });

        // if (!user) {
          // user = await User.create({
          //   googleId:"103602542208303435870",
          //   name: profile.displayName,
          //   email: profile.emails[0].value,
          //   picture: profile.photos[0].value,
          // });
        //   console.log("User created success:", user);
        // } else {
        //   console.log("User already exists!!");
        // }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);


module.exports = passport;
