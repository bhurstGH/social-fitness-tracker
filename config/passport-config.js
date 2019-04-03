const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({ email: email })
          .then(user => {
            if (!user) {
              req.authError = "That email is not registered";
              return done(null, false);
            }

            bcrypt.compare(password, user.password).then(isMatch => {
              if (isMatch) {
                return done(null, user);
              } else {
                req.authError = "Password incorrect";
                return done(null, false, { message: "Password incorrect." });
              }
            });
          })
          .catch(err => {
            done(err);
          });
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
