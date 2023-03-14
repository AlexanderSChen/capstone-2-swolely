const Comment = require("./Comment");
const db = require("../db");
const { NotFoundError } = require("../expressError");

describe("Comment class", function () {
  beforeEach(async function () {
    await db.query("DELETE FROM comments");
    await db.query("DELETE FROM posts");
    await db.query("DELETE FROM users");

    await db.query(`
      INSERT INTO users (username, password, first_name, last_name, email)
      VALUES ('testuser', 'password', 'Test', 'User', 'testuser@example.com')`);

    const postRes = await db.query(`
      INSERT INTO posts (title, body, username)
      VALUES ('Test Post', 'This is a test post.', 'testuser')
      RETURNING id`);

    this.testPostId = postRes.rows[0].id;
  });

  describe("create", function () {
    it("creates a new comment", async function () {
      const comment = await Comment.create({
        text: "This is a test comment.",
        postId: this.testPostId,
        username: "testuser",
      });
      expect(comment).toEqual({
        id: expect.any(Number),
        text: "This is a test comment.",
        post_id: this.testPostId,
        username: "testuser",
      });

      const result = await db.query(`
        SELECT id, text, post_id, username
        FROM comments
        WHERE id = $1`, [comment.id]);
      expect(result.rows).toEqual([{
        id: comment.id,
        text: "This is a test comment.",
        post_id: this.testPostId,
        username: "testuser",
      }]);
    });

    it("throws an error if postId is invalid", async function () {
      try {
        await Comment.create({
          text: "This is a test comment.",
          postId: 999,
          username: "testuser",
        });
        fail("Expected NotFoundError, but none was thrown");
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy();
        expect(err.message).toEqual("No post: 999");
      }
    });

    it("throws an error if username is invalid", async function () {
      try {
        await Comment.create({
          text: "This is a test comment.",
          postId: this.testPostId,
          username: "invaliduser",
        });
        fail("Expected NotFoundError, but none was thrown");
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy();
        expect(err.message).toEqual("No username: invaliduser");
      }
    });
  });

  describe("get", function () {
    it("returns a comment by ID", async function () {
      const commentRes = await db.query(`
        INSERT INTO comments (text, post_id, username)
        VALUES ('This is a test comment.', $1, 'testuser')
        RETURNING id`, [this.testPostId]);

      const comment = await Comment.get(commentRes.rows[0].id);
      expect(comment).toEqual({
        id: commentRes.rows[0].id,
        text: "This is a test comment.",
        post_id: this.testPostId,
        username: "testuser",
      });
    });

    it("throws an error if comment ID is invalid", async function () {
      try {
        await Comment.get(999);
        fail("Expected NotFoundError, but none was thrown");
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy();
        expect(err.message).toEqual("No comment: 999");
      }
    });
  });
});