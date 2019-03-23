const express = require("express");
const app = express();

const appConfig = require("./config/app-config");
const routeConfig = require("./config/routes-config");

appConfig(app, express);
routeConfig(app);

module.exports = app;
