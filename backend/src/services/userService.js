const pool = require("../database/postgres");

exports.findAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
  return result.rows;
};

exports.findUserById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

exports.createUser = async (name) => {
  const cleanName = name.trim();

  const result = await pool.query(
    "INSERT INTO users (name) VALUES ($1) RETURNING *",
    [cleanName]
  );

  return result.rows[0];
};

exports.updateUser = async (id, name) => {
  const cleanName = name.trim();

  const result = await pool.query(
    "UPDATE users SET name = $1 WHERE id = $2 RETURNING *",
    [cleanName, id]
  );

  return result.rows[0];
};

exports.deleteUser = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};