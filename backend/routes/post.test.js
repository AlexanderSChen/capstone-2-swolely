const request = require("supertest");
const app = require("../app");

// A sample post object to be used in the tests
const testPost = {
  username: "testuser",
  title: "Test post title",
  description: "Test post description",
  body: "Test post body",
};

describe("POST /posts", function () {
  test("Creates a new post", async function () {
    const response = await request(app)
      .post("/posts")
      .send(testPost);
    expect(response.statusCode).toBe(201);
    expect(response.body.post).toHaveProperty("id");
    expect(response.body.post.username).toBe(testPost.username);
    expect(response.body.post.title).toBe(testPost.title);
    expect(response.body.post.description).toBe(testPost.description);
    expect(response.body.post.body).toBe(testPost.body);
    expect(response.body.post.votes).toBe(0);
  });

  test("Prevents creating a post with missing required fields", async function () {
    const response = await request(app)
      .post("/posts")
      .send({ username: "testuser" });
    expect(response.statusCode).toBe(400);
  });
});

describe("GET /posts", function () {
  test("Retrieves all posts", async function () {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
    expect(response.body.posts).toHaveLength(1);
  });
});

describe("GET /posts/:id", function () {
  test("Retrieves a single post by id", async function () {
    const response = await request(app)
      .get(`/posts/${testPost.id}`)
      .send(testPost);
    expect(response.statusCode).toBe(200);
    expect(response.body.post).toHaveProperty("id");
    expect(response.body.post.username).toBe(testPost.username);
    expect(response.body.post.title).toBe(testPost.title);
    expect(response.body.post.description).toBe(testPost.description);
    expect(response.body.post.body).toBe(testPost.body);
    expect(response.body.post.votes).toBe(0);
  });

  test("Returns a 404 if post id is not found", async function () {
    const response = await request(app)
      .get("/posts/invalidid")
      .send(testPost);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Post not found");
  });
});

describe("PATCH /posts/:id", function () {
  test("Updates a post", async function () {
    const response = await request(app)
      .patch(`/posts/${testPost.id}`)
      .send({ title: "Updated title" });
    expect(response.statusCode).toBe(200);
    expect(response.body.post).toHaveProperty("id");
    expect(response.body.post.username).toBe(testPost.username);
    expect(response.body.post.title).toBe("Updated title");
    expect(response.body.post.description).toBe(testPost.description);
    expect(response.body.post.body).toBe(testPost.body);
    expect(response.body.post.votes).toBe(0);
  });

  test("Prevents updating a post with invalid data", async function () {
    const response = await request(app)
      .patch(`/posts/${testPost.id}`)
      .send({ invalidField: "invalid value" });
    expect(response.statusCode).toBe(400);
  });
});

describe("DELETE /posts/:id", function () {
  test("Deletes a post", async function () {
    const response = await request(app).delete(`/posts/${testPost.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Post deleted");
  });
});
