const knex = require("../db");

exports.get = function (tag) {

    return knex.select()
        .from("hashtags")
        .where({
            tag: tag
        });
};

exports.inc = function (tag) {

    return function (getResults) {

        if (getResults.length === 0) {
            return knex.insert({
                tag: tag,
                occurrences: 1
            }).into("hashtags");
        }

        return knex("hashtags").where({
            tag: tag
        }).update({
            occurrences: getResults[0].occurrences + 1
        });
    };
};

exports.incArr = function (arr, cb) {

    let idx = -1;

    const incHash = function incHash() {

        idx += 1;

        if (idx >= arr.length) {
            if (typeof cb === "function") {
                cb.call();
            }
        } else {
            exports.get(arr[idx]).then(exports.inc(arr[idx])).then(incHash);
        }
    };

    incHash();
};

exports.all = function () {
    return knex.select()
        .from("hashtags");
};

exports.top10 = function () {
    return exports.all().orderBy("occurrences", "DESC").limit(10);
};

exports.fromText = function (txt) {
    return txt.match(/#[a-z\d]+/gi);
};
