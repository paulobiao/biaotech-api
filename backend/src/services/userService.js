const db = require("../database/db");

exports.findAllUsers = () => {
  return db.prepare("SELECT * FROM users").all();
};

exports.findUserById = (id) => {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
};

exports.createUser = (name) => {
  const cleanName = name.trim();

  const result = db
    .prepare("INSERT INTO users (name) VALUES (?)")
    .run(cleanName);

  return {
    id: result.lastInsertRowid,
    name: cleanName,
  };
};

exports.updateUser = (id, name) => {
  const cleanName = name.trim();

  db.prepare("UPDATE users SET name = ? WHERE id = ?").run(cleanName, id);

  return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
};

exports.deleteUser = (id) => {
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

  if (!user) {
    return null;
  }

  db.prepare("DELETE FROM users WHERE id = ?").run(id);

  return user;
};