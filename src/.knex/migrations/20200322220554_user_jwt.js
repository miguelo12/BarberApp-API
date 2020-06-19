exports.up = async function (knex) {
  return Promise.all([
    knex.schema.createTable("user_jwt", (tbl) => {
      tbl.integer("user_id").unsigned();
      tbl.foreign("user_id").references("user.id");
      tbl.text("token").notNullable();
      tbl.integer("time_limit").notNullable();
      tbl.timestamps();
      tbl.unique("user_id");
    }),
  ]);
};

exports.down = async function (knex) {
  return Promise.all([knex.schema.dropTable("user_jwt")]);
};
