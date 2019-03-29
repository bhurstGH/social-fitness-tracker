const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: "That email is not registered."
            });
          }

          bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
              console.log(user);
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect." });
            }
          });
        })
        .catch(err => done(err));
    })
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
