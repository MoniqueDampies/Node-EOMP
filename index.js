// IMPORTING MODULES
require("dotenv").config();
const db = require("./config/dbconn");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const jwt = require("json-web-token");
const { genSalt, compare, hash } = require("bcrypt");

const app = express();

const router = express.Router();

const port = parseInt(process.env.Port); || 4000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});