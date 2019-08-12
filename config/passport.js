const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      console.log("email", email);
      User.findOne({ email: email }).then(user => {
        if (!user) {
          return done(null, false, { message: "No User found" });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (isMatch) {
            console.log("isMatch", isMatch);
            return done(null, user);
          } else {
            return done(null, false, { message: "Password Incorrect" });
          }
        });
      });
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
