const express = require("express");
const app = express();
require("./config/app-config")(app, express);
require("./config/routes-config")(app, express);

module.export = app;
