const request = require("supertest");
const app = require("../src/app");

describe("Auth endpoints", () => {
  it("should return 400 when email or password is missing", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Email e senha são obrigatórios");
  });
});