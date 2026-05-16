"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.findUserById = exports.findAllUsers = void 0;
const postgres_1 = require("../database/postgres");
const findAllUsers = async () => {
    const result = await postgres_1.pool.query("SELECT * FROM users ORDER BY id ASC");
    return result.rows;
};
exports.findAllUsers = findAllUsers;
const findUserById = async (id) => {
    const result = await postgres_1.pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
};
exports.findUserById = findUserById;
const createUser = async (name) => {
    const cleanName = name.trim();
    const result = await postgres_1.pool.query("INSERT INTO users (name) VALUES ($1) RETURNING *", [cleanName]);
    return result.rows[0];
};
exports.createUser = createUser;
const updateUser = async (id, name) => {
    const cleanName = name.trim();
    const result = await postgres_1.pool.query("UPDATE users SET name = $1 WHERE id = $2 RETURNING *", [cleanName, id]);
    return result.rows[0];
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    const result = await postgres_1.pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};
exports.deleteUser = deleteUser;
