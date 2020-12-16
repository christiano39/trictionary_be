const db = require("../data/dbConfig");

module.exports = {
  getById,
  add,
  getUnmoderatedWord,
  getApprovedWords,
  update,
};

function getById(id) {
  return db("Words").where({ id }).first();
}

function add(wordObj) {
  return db("Words").insert(wordObj).returning("id");
}

function getUnmoderatedWord() {
  return db("Words").where({ moderated: false }).first();
}

function getApprovedWords() {
  return db("Words").where({ moderated: true, approved: true });
}

function update(id, changes) {
  return db("Words")
    .where({ id })
    .update(changes)
    .then(() => {
      return getById(id);
    });
}
