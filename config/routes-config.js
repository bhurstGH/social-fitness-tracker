module.exports = app => {
  const userRoutes = require("../routes/users");

  app.use(userRoutes);
};
