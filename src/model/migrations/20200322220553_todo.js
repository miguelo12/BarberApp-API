
exports.up = function(knex) {
    return knex.schema.createTable("user", tbl => {
        tbl.increments();
        tbl.text("username", 256).notNullable();
        tbl.text("email", 256).notNullable();
        tbl.text("email", 128).notNullable();
    });
};

exports.down = function(knex) {
  
};
