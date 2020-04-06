exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable("user", (tbl) => {
      tbl.increments();
      tbl.string("username", 150).notNullable();
      tbl.string("email", 150).notNullable();
      tbl.text("password").notNullable();
      tbl.timestamps();
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([knex.schema.dropTable("user")]);
};
