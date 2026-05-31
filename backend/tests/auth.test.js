const request = require("supertest");
const appModule = require("../src/app");
const app = appModule.default || appModule;
const runMigrationsModule = require("../src/database/runMigrations");
const runMigrations = runMigrationsModule.default || runMigrationsModule;

const initPostgresModule = require("../src/database/initPostgres");
const initPostgres = initPostgresModule.default || initPostgresModule;
const { pool } = require("../src/database/postgres");

beforeAll(async () => {
  await runMigrations();
  await initPostgres();
});

afterAll(async () => {
  await pool.end();
});

describe("Auth endpoints", () => {
  it("should return 400 when email or password is missing", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Email e senha são obrigatórios");
  });

  it("should login with valid credentials and return a JWT token", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@biaotech.dev",
        password: "123456",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
    expect(typeof response.body.token).toBe("string");
  });
});