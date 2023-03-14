const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related function for comments */

class Comment {
  /** Create a comment: updates db, returns new comment data.
   *
   * - text: text of comment
   * - postId: post's id that the comment is associated with
   * - username: username of commenter
   * Returns:
   *   { id, text, post_id, username }
   **/
  static async create({ text, postId, username }) {
    const preCheck = await db.query(
      `SELECT id
           FROM posts
           WHERE id = $1`, [postId]);
    const post = preCheck.rows[0];

    if (!post) throw new NotFoundError(`No post: ${postId}`);

    const preCheck2 = await db.query(
          `SELECT username
           FROM users
           WHERE username = $1`, [username]);
    const user = preCheck2.rows[0];

    if (!user) throw new NotFoundError(`No username: ${username}`);

    const result = await db.query(
      `INSERT INTO comments (text, post_id, username)
           VALUES ($1, $2, $3)
           RETURNING id, text, post_id, username`,
      [text, postId, username]
    );

    return result.rows[0];
  }

  /** Given a comment id, return data about comment.
   *
   * Returns:
   *  { id, text, post_id, username }
   *
   * Throws NotFoundError if not found.
   **/
  static async get(id) {
    const result = await db.query(
      `SELECT id,
                  text,
                  post_id,
                  username
           FROM comments
           WHERE id = $1`,
      [id]
    );

    const comment = result.rows[0];

    if (!comment) throw new NotFoundError(`No comment: ${id}`);

    return comment;
  }

  /** Update comment data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include:
   *  { text }
   *
   * Returns:
   *  { id, text, post_id, username }
   *
   * Throws NotFoundError if not found.
   */
  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {});

    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE comments
                      SET ${setCols}
                      WHERE id = ${idVarIdx}
                      RETURNING id,
                                text,
                                post_id,
                                username`;
    const result = await db.query(querySql, [...values, id]);
    const comment = result.rows[0];

    if (!comment) throw new NotFoundError(`No comment: ${id}`);

    return comment;
  }

  /** Delete given comment from database; returns undefined.
   *
   * Throws NotFoundError if comment not found.
   **/
  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM comments
           WHERE id = $1
           RETURNING id`,
      [id]
    );
    const comment = result.rows[0];

    if (!comment) throw new NotFoundError(`No comment: ${id}`);
  }
}

module.exports = Comment;
