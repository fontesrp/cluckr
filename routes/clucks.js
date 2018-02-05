const express = require("express");
const knex = require("../db");
const router = express.Router();

router.get("/", function (req, res) {
    res.send("Print all clucks by this user");
});

router.post("/", function (req, res) {

    const username = res.locals.username;

    if (username === "" || req.body.content === undefined && req.body.image === undefined) {
        res.redirect("/home");
        return;
    }

    knex.insert({
        username: username,
        image_url: req.body.image,
        content: req.body.content
    }).into("clucks").then(function (results) {
        res.redirect("/home");
    });
});

router.get("/new", function (req, res) {
    res.render("clucks/new");
});

module.exports = router;
