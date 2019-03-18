const app = require("./app");
const http = require("http");

// Port to environment variable or 8000
const port = process.env.PORT || 8000;

// Server with Express app request handler
const server = http.createServer(app);

// Listen on port
server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
