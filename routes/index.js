const express = require("express");
const router = express.Router();

// 1 week
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;

router.get("/", function (req, res) {
    res.redirect("/home");
});

router.get("/home", function (req, res) {
    res.redirect("/clucks");
});

// VERB: GET, PATH: /sign_in
router.get("/sign_in", function (req, res) {
    res.render("sign_in", {
        title: "Sign in"
    });
});

// VERB: GET, PATH: /sign_out
router.get("/sign_out", function (req, res) {
    res.clearCookie("username");
    res.redirect("home");
});

// HTTP VERG: POST, PATH: /sign_in
router.post("/sign_in", function (req, res) {

    const username = req.body.username;

    if (username !== undefined) {
        res.cookie("username", username, {
            maxAge: COOKIE_MAX_AGE
        });
    }

    res.redirect("/home");
});

module.exports = router;
