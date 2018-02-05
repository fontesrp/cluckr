const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const index = require("./routes/index");
const clucks = require("./routes/clucks");

const app = express();

app.set("view engine", "ejs");

// Logging middleware
app.use(logger("dev"));

// Static assets middleware
app.use(express.static(path.join(__dirname, "public")));

// Parse POST requests
app.use(bodyParser.urlencoded({
    extended: true
}));

// Parse cookies
app.use(cookieParser());

app.use(function (req, res, next) {

    const username = req.cookies.username;

    res.locals.username = (username === undefined)
        ? ""
        : username;

    next();
});

app.use("/", index);
app.use("/clucks", clucks);

const DOMAIN = "localhost";
const PORT = 3002;

app.listen(PORT, DOMAIN, function () {
    console.log("Server is up!");
    console.log("Listening on " + DOMAIN + ":" + PORT);
});
