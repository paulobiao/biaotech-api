import request from "supertest";
import app from "../src/app";
import { Response } from "supertest";

describe("Health endpoint", () => {
  it("should return API health status", async () => {
    const response: Response = await request(app).get("/api/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.status).toBe("ok");
    expect(response.body.service).toBe("biaotech-api");
  });
});
