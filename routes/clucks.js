const express = require("express");
const knex = require("../db");
const router = express.Router();

router.get("/", function (req, res) {
    knex.select()
        .from("clucks")
        .orderBy("created_at", "DESC")
        .then(function (results) {
            res.render("clucks/index", {
                clucks: results
            });
        });
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
        res.redirect("/clucks");
    });
});

router.get("/new", function (req, res) {
    res.render("clucks/new");
});

module.exports = router;
