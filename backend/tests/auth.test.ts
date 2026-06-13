import request from "supertest";
import app from "../src/app";
import runMigrations from "../src/database/runMigrations";
import initPostgres from "../src/database/initPostgres";
import { pool } from "../src/database/postgres";
import { Response } from "supertest";

beforeAll(async () => {
  await runMigrations();
  await initPostgres();
});

afterAll(async () => {
  await pool.end();
});

describe("Auth endpoints", () => {
  it("should return 400 when email or password is missing", async () => {
    const response: Response = await request(app)
      .post("/api/auth/login")
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Email e senha são obrigatórios");
  });

  it("should login with valid credentials and return a JWT token", async () => {
    const response: Response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@biaotech.dev",
        password: "123456",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.accessToken).toBeDefined();
    expect(typeof response.body.accessToken).toBe("string");

    expect(response.body.refreshToken).toBeDefined();
    expect(typeof response.body.refreshToken).toBe("string");
  });
});
