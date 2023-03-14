"use strict";

const { NotFoundError } = require("../expressError");
const db = require("../db");
const Post = require("./post");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("../tests/helpers/testUtils");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Post", function () {
  describe("create", function () {
    const newPost = {
      title: "Test post",
      description: "Test description",
      body: "Test body",
    };

    test("works", async function () {
      let post = await Post.create(newPost);
      expect(post).toEqual({
        id: expect.any(Number),
        title: "Test post",
        description: "Test description",
        body: "Test body",
        votes: 0,
      });

      const result = await db.query(
        `SELECT id, title, description, body, votes
         FROM posts
         WHERE title = 'Test post'`
      );
      expect(result.rows).toEqual([
        {
          id: expect.any(Number),
          title: "Test post",
          description: "Test description",
          body: "Test body",
          votes: 0,
        },
      ]);
    });

    test("throws BadRequestError if post with same title exists", async function () {
      try {
        await Post.create(newPost);
        await Post.create(newPost);
        fail("Expected BadRequestError");
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy();
      }
    });
  });

  describe("findAll", function () {
    test("works", async function () {
      let posts = await Post.findAll();
      expect(posts).toEqual([
        {
          id: expect.any(Number),
          title: "Post 1",
          description: "Description 1",
          body: "Body 1",
          votes: 0,
        },
        {
          id: expect.any(Number),
          title: "Post 2",
          description: "Description 2",
          body: "Body 2",
          votes: 0,
        },
      ]);
    });
  });

  describe("get", function () {
    test("works", async function () {
      let post = await Post.get(1);
      expect(post).toEqual({
        id: 1,
        title: "Post 1",
        description: "Description 1",
        body: "Body 1",
        votes: 0,
        comments: [
          { id: expect.any(Number), text: "Comment 1", username: "user1" },
          { id: expect.any(Number), text: "Comment 2", username: "user2" },
        ],
      });
    });

    test("throws NotFoundError if post not found", async function () {
      try {
        await Post.get(999);
        fail("Expected NotFoundError");
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy();
      }
    });
  });

  describe('update', function () {
    beforeEach(async function () {
      // create test data
      await db.query('DELETE FROM posts');
      await db.query('DELETE FROM comments');
      await db.query(`
        INSERT INTO posts (id, title, description, body, votes)
        VALUES (1, 'test title', 'test description', 'test body', 0)
      `);
    });
  
    test('works', async function () {
      const postData = {
        title: 'updated title',
        body: 'updated body',
      };
      const post = await Post.update(1, postData);
      expect(post).toEqual({
        id: 1,
        title: 'updated title',
        description: 'test description',
        body: 'updated body',
        votes: 0,
      });
  
      const result = await db.query(`
        SELECT id, title, description, body, votes
        FROM posts
        WHERE id = 1
      `);
      expect(result.rows).toEqual([
        {
          id: 1,
          title: 'updated title',
          description: 'test description',
          body: 'updated body',
          votes: 0,
        },
      ]);
    });
  
    test('not found if no such post', async function () {
      try {
        await Post.update(999, { title: 'test title' });
        fail();
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy();
      }
    });
    });
});