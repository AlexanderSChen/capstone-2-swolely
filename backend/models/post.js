"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for posts. */

class Post {
  /** Create a post (from data), update db, return new post data.
   *
   * data should be { username, title, description, body }
   *
   * Returns { id, username, title, description, body, votes }
   *
   * Throws BadRequestError if post already in database.
   * */

  static async create(data) {
    const duplicateCheck = await db.query(
      `SELECT title
       FROM posts
       WHERE title = $1`,
      [data.title]
    );

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate post: ${data.title}`);

    const result = await db.query(
      `INSERT INTO posts (title, description, body)
           VALUES ($1, $2, $3)
           RETURNING id, title, description, body, votes`,
      [data.title, data.description, data.body]
    );
    const post = result.rows[0];

    return post;
  }

  /** Find all posts.
   *
   * Returns [{ id, username, title, description, body, votes }, ...]
   * */

  static async findAll() {
    const result = await db.query(
      `SELECT id,
                title,
                description,
                body,
                votes
           FROM posts
           ORDER BY title`
    );

    return result.rows;
  }

  /** Given a post id, return data about post.
   *
   * Returns { id, username, title, description, body, votes, comments: [comment, ...] }
   *   where comment is { id, text, username }
   *
   * Throws NotFoundError if post not found.
   **/

  static async get(id) {
    const postRes = await db.query(
      `SELECT p.id,
                  p.title,
                  p.description,
                  p.body,
                  p.votes,
                  c.id AS comment_id,
                  c.text AS comment_text,
           FROM posts AS p
           LEFT JOIN comments AS c ON p.id = c.post_id
           WHERE p.id = $1`,
      [id]
    );

    const post = postRes.rows[0];

    if (!post) throw new NotFoundError(`No post: ${id}`);

    const postComments = postRes.rows
      .filter((row) => row.comment_id)
      .map((row) => ({
        id: row.comment_id,
        text: row.comment_text,
      }));

    delete post.comment_id;
    delete post.comment_text;

    return { ...post, comments: postComments };
  }

  /** Update post data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Returns { id, username, title, description, body, votes }
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE posts
                      SET ${setCols}
                      WHERE id = ${idVarIdx}
                      RETURNING id,
                                title,
                                description,
                                body,
                                votes`;

    const result = await db.query(querySql, [...values, id]);
    const post = result.rows[0];

    if (!post) throw new NotFoundError(`No post: ${id}`);

    return post;
  }

  /** Delete given post from database; returns undefined.
   * 
   * Throws NotFoundError if post not found.
   */

  static async remove(id) {
    const result = await db.query(
        `DELETE 
        FROM posts
        WHERE id=$1
        RETURNING id`, [id]
    )
    const post = result.rows[0];
    if(!post) throw new NotFoundError(`No post: ${id}`);
  }
}

module.exports = Post;