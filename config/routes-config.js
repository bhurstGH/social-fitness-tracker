module.exports = app => {
  const userRoutes = require("../routes/users");
  const routineRoutes = require("../routes/routines");
  const exerciseRoutes = require("../routes/exercises");

  app.use(userRoutes);
  app.use(routineRoutes);
  app.use(exerciseRoutes);
};
