exports.up = async function (knex) {
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

exports.down = async function (knex) {
  return Promise.all([knex.schema.dropTable("user")]);
};
