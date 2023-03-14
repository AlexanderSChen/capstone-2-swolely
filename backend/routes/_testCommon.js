// testCommon.js

const db = require("./db");
const Post = require("./models/post");

async function createTestData() {
  await Post.create({
    username: "testuser",
    title: "Test post",
    description: "This is a test post",
    body: "Test post body",
    votes: 0,
  });
}

async function dropAllData() {
  await db.query("DELETE FROM posts");
}

async function endConnection() {
  await db.end();
}

module.exports = { createTestData, dropAllData, endConnection };
