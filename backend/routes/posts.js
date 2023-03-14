"use strict";

/** Routes for posts. */

const jsonschema = require("jsonschema");

const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const { NotFoundError } = require("../expressError");
const { BadRequestError } = require("../expressError");
const postNewSchema = require("../schemas/postNew.json");
const postUpdateSchema = require("../schemas/postUpdate.json");
// const { ensureCorrectUserOrAdmin } = require("../middleware/auth");

/** POST / { post } => { post }
 *
 * post should be { username, title, description, body }
 *
 * Returns { id, username, title, description, body, votes }
 *
 * Throws BadRequestError if post already in database.
 **/

router.post("/", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, postNewSchema);
    if(!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
    }
    const post = await Post.create(req.body);
    return res.status(201).json({ post });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>  { posts }
 *
 * Returns [{ id, username, title, description, body, votes }, ...]
 **/

router.get("/", async function (req, res, next) {
  try {
    const posts = await Post.findAll();
    return res.json({ posts });
  } catch (err) {
    return next(err);
  }
});

/** GET /[id]  =>  { post }
 *
 * Returns { id, username, title, description, body, votes, comments: [comment, ...] }
 *   where comment is { id, text, username }
 *
 * Throws NotFoundError if post not found.
 **/

router.get("/:id", async function (req, res, next) {
  try {
    const post = await Post.get(req.params.id);
    return res.json({ post });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({ message: err.message });
    }
    return next(err);
  }
});

/** PATCH /[id] { data } => { post }
 *
 * data can include: { title, description, body }
 *
 * Returns { id, username, title, description, body, votes }
 *
 * Throws NotFoundError if post not found.
 **/

router.patch("/:id", async function (req, res, next) {
        try {
            const validator = jsonschema.validate(req.body, postUpdateSchema);
            if(!validator.valid) {
                const errs = validator.errors.map(e => e.stack);
                throw new BadRequestError(errs);
            }

            const post = await Post.update(req.params.id, req.body);
            return res.json({ post });
        } catch (err) {
            return next(err);
        }
    }
);

    /** DELETE /[id]  =>  { message: "Post deleted" }
     *
     * Authorization required: logged in
     */

router.delete("/:id", async function (req, res, next) {
    try {
        await Post.remove(req.params.id);
        return res.json({ message: "Post deleted" });
    } catch (err) {
        return next(err);
    }
});  
  

module.exports = router;
