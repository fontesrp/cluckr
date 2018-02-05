const express = require("express");
const knex = require("../db");
const hashtags = require("../helpers/hashtags.js");
const router = express.Router();

router.get("/", function (req, res) {
    knex.select()
        .from("clucks")
        .orderBy("created_at", "DESC")
        .then(function (clucks) {
            hashtags.top10().then(function (hashes) {
                res.render("clucks/index", {
                    clucks,
                    hashes
                });
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
    }).into("clucks").then(function () {

        const hashes = hashtags.fromText(req.body.content);
        console.log("hashes", hashes);

        if (hashes !== null && hashes.length !== 0) {
            hashtags.incArr(hashes, function () {
                res.redirect("/clucks");
            });
        } else {
            res.redirect("/clucks");
        }
    });
});

router.get("/new", function (req, res) {
    res.render("clucks/new");
});

module.exports = router;
