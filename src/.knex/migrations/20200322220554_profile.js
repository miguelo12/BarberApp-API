exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable("profile", (tbl) => {
      tbl.increments();
      tbl.integer("user_id").unsigned();
      tbl.foreign("user_id").references("user.id");
      tbl.string("full_name", 300);
      tbl.string("full_lastname", 300);
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([knex.schema.dropTable("profile")]);
};
