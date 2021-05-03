const express = require("express");

const app = express();

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);
