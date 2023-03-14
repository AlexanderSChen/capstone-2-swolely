const request = require("supertest");
const app = require("./app");

describe("Test the root path", () => {
  test("It should respond to the GET method with a 404 status", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(404);
  });
});

describe("Test the /auth path", () => {
  test("It should respond to the GET method with a 404 status", async () => {
    const response = await request(app).get("/auth");
    expect(response.statusCode).toBe(404);
  });
});

describe("Test the /comments path", () => {
  test("It should respond to the GET method with a 404 status", async () => {
    const response = await request(app).get("/comments");
    expect(response.statusCode).toBe(404);
  });
});

describe("Test the /users path", () => {
  test("It should respond to the GET method with a 404 status", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(404);
  });
});

describe("Test the /posts path", () => {
  test("It should respond to the GET method with a 404 status", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(404);
  });
});
