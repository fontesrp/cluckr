const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");

const app = express();

app.set("view engine", "ejs");

// Logging middleware
app.use(logger("dev"));

// Static assets middleware
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
    res.send("It works!");
});

const DOMAIN = "localhost";
const PORT = 3002;

app.listen(PORT, DOMAIN, function () {
    console.log("Server is up!");
    console.log("Listening on " + DOMAIN + ":" + PORT);
});
