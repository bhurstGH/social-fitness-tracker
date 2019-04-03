require("dotenv").config();
const axios = require("axios");
const assert = require("assert").strict;
const User = require("../models/User");
const base = "http://localhost:5000/users/";

describe("User routes", () => {
  describe("POST /users", () => {
    it("should create a new user", done => {
      const newUser = {
        username: "JohnDoe",
        email: "test@test.com",
        password: "asdasd"
      };

      axios
        .post(base, newUser)
        .then(res => {
          User.findById(res.user.data._id).then(user => {
            assert(user === newUser);
            done();
          });
        })
        .catch(err => done());
    });
  });
});
