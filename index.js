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

app.get("/", function (req, res) {
    res.send("It works!");
});

// VERB: GET, PATH: /sign_in
app.get("/sign_in", function (req, res) {
    res.render("sign_in", {
        title: "Sign in"
    });
});

// VERB: GET, PATH: /sign_out
app.get("/sign_out", function (req, res) {
    res.clearCookie("username");
    res.redirect("home");
});

// 1 week
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;

// HTTP VERG: POST, PATH: /sign_in
app.post("/sign_in", function (req, res) {

    const username = req.body.username;

    if (username !== undefined) {
        res.cookie("username", username, {
            maxAge: COOKIE_MAX_AGE
        });
    }

    res.redirect("/home");
});

const DOMAIN = "localhost";
const PORT = 3002;

app.listen(PORT, DOMAIN, function () {
    console.log("Server is up!");
    console.log("Listening on " + DOMAIN + ":" + PORT);
});
