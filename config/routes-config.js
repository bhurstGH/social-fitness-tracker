module.exports = app => {
  const userRoutes = require("../routes/users");
  const routineRoutes = require("../routes/routines");

  app.use(userRoutes);
  app.use(routineRoutes);
};
