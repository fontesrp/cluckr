
exports.up = function(knex, Promise) {

    return knex.schema.createTable("hashtags", function (table) {

        table.increments("id");

        table.string("tag");
        table.integer("occurrences");

        table.timestamps(false, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("hashtags");
};
