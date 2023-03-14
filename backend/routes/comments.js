"use strict";

/** Routes for comments. */

const jsonschema = require("jsonschema");

const express = require("express");
const router = new express.Router();
const Comment = require("../models/comment");
const commentNewSchema = require("../schemas/commentNew.json");
const commentUpdateSchema = require("../schemas/commentUpdate.json");
const { BadRequestError } = require("../expressError");
const { ensureCorrectUserOrAdmin } = require("../middleware/auth");

/** POST /  { comment } =>  { comment }
 *
 * Adds a new comment.
 *
 * The following data fields are required in the request body:
 * { text, postId, username }
 *
 * Returns { id, text, post_id, username }
 *
 * Throws BadRequestError if data fields are not provided.
 **/
router.post("/", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, commentNewSchema);
        if(!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const { text, postId, username } = req.body;
        const comment = await Comment.create({ text, postId });
        return res.status(201).json({ comment });
    } catch (err) {
        return next(err);
    }
});

/** GET /[id] => { comment }
 *
 * Returns { id, text, post_id, username }
 *
 * Throws NotFoundError if comment is not found.
 **/
router.get("/:id", async function (req, res, next) {
  try {
    const comment = await Comment.get(req.params.id);
    return res.json({ comment });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[id] { comment } => { comment }
 *
 * Updates comment with 'id'.
 *
 * The following fields may be included in the request body:
 * { text }
 *
 * Returns { id, text, post_id, username }
 *
 * Throws BadRequestError if no fields are provided.
 **/
router.patch("/:id", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, commentUpdateSchema);
    if(!validator.valid) {
        const errs = validator.erros.map(e => e.stack);
        throw new BadRequestError(errs);
    }

    const comment = await Comment.update(req.params.id, req.body);
    return res.json({ comment });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[id]  =>  { deleted: id }
 *
 * Deletes comment with 'id' from the database.
 *
 * Returns { deleted: id }
 *
 **/
router.delete("/:id", async function (req, res, next) {
  try {
    await Comment.remove(req.params.id);
    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
