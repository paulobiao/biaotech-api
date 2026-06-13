import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../src/app";
import runMigrations from "../src/database/runMigrations";
import initPostgres from "../src/database/initPostgres";
import { Response } from "supertest";

describe("Users endpoints", () => {
  let adminToken: string;
  let userToken: string;
  let createdUserId: number;

  beforeAll(async () => {
    await runMigrations();
    await initPostgres();

    const loginResponse: Response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@biaotech.dev",
        password: "123456",
      });

    adminToken = loginResponse.body.accessToken;

    userToken = jwt.sign(
      {
        id: 999,
        email: "regular@biaotech.dev",
        role: "user",
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
  });

  it("should deny access without token", async () => {
    const response: Response = await request(app).get("/api/users");

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("should allow access with valid JWT token", async () => {
    const response: Response = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.users)).toBe(true);
  });

  it("should create a new user", async () => {
    const response: Response = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Paulo Test",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.user.name).toBe("Paulo Test");

    createdUserId = response.body.user.id;
  });

  it("should validate user name", async () => {
    const response: Response = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "a",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should get user by id", async () => {
    const response: Response = await request(app)
      .get(`/api/users/${createdUserId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.user.id).toBe(createdUserId);
  });

  it("should update user", async () => {
    const response: Response = await request(app)
      .put(`/api/users/${createdUserId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Updated User",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.user.name).toBe("Updated User");
  });

  it("should deny delete user for regular user role", async () => {
    const response: Response = await request(app)
      .delete(`/api/users/${createdUserId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.statusCode).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Acesso negado");
  });

  it("should allow delete user for admin role", async () => {
    const response: Response = await request(app)
      .delete(`/api/users/${createdUserId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
