
exports.up = function (knex) {

    return knex.schema.createTable("clucks", function (table) {

        table.increments("id");

        table.string("username");
        table.string("image_url");
        table.text("content");

        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("clucks");
};
