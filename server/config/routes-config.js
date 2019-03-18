const path = require("path");

module.exports = (app, express) => {
  // Check for production environment and direct to React
  if (process.env.NODE_ENV === "production") {
    // Serve static files from React build
    app.use(express.static(path.join(__dirname, "../../client/build")));

    // Serve unhandled paths to React index.html
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../../client/build/index.html"));
    });
  }
};
