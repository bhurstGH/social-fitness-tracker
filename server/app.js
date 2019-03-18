const express = require("express");
const app = express();
require("./config/app-config")(app, express);

module.export = app;
