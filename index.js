"use strict";

const port = 5000;

const express = require("express");
const app = express();
app.listen(port);
console.log("Server works on port: " + port.toString());

const way = __dirname + "/static";
app.use(express.static(way));
