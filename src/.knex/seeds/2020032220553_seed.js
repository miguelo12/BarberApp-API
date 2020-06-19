exports.seed = async function (knex) {
  return knex("user")
    .del()
    .then(() => {
      return knex("user").insert([
        { username: "user_test", email: "user@gmail.com", password: "barber" },
      ]);
    });
};
