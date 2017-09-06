
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username: "wallytreats",
          twitter: "wallytreats",
          discord: "jfQ3kTd"
        },
        {
          id: 2,
          username: "xbeezlebubs",
          twitter: "-placeholder",
          discord: "-placeholder"
        },
        {
          id: 3,
          username: "badbadrobot",
          twitter: "badbadrobot",
          discord: "-placeholder"
        }
      ]);
    })
    .then(function (){
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));")
    })
};
