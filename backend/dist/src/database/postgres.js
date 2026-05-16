"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
const testConnection = async () => {
    try {
        await exports.pool.query("SELECT 1");
        console.log("✅ Connected to PostgreSQL");
    }
    catch (error) {
        console.error("❌ PostgreSQL connection error:", error);
    }
};
exports.testConnection = testConnection;
