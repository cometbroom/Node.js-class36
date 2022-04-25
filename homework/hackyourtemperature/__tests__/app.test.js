import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("GET /", () => {
  it("Should respond with a 200 status code", async () => {
    const response = await request.get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /weather", () => {
  it("Should respond with a 200 status code", async () => {
    const response = await request.post("/weather/alkmaar");
    expect(response.statusCode).toBe(200);
  });
  it("Returns the correct city pattern", async () => {
    const response = await request.post("/weather/alkmaar");
    expect("alkmaar" in response.body).toBe(true);
    expect(typeof response.body.alkmaar).toBe("number");
  });
  it("Returns error when given gibberish", async () => {
    const response = await request.post("/weather/wewgrefvgfeer");
    expect(response.statusCode).toBe(404);
  });
  it("Return error when given empty string", async () => {
    const response = await request.post("/weather/ ");
    expect(response.statusCode).toBe(404);
  });
});
