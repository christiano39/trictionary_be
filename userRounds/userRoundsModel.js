const db = require("../data/dbConfig");

module.exports = {
  add,
};

function add(userId, roundId) {
  const newUserRound = { user_id: userId, round_id: roundId };

  return db("User-Rounds").insert(newUserRound).returning("id");
}
