'use strict';

// Import the Express server module
const express = require('express');
const commentTable = require('../../database/tables/comment-table');

// Create our router for our comments API
const commentRouter = express.Router();

// Get all comments
commentRouter.get('/:postId/comments/', async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const comments = await commentTable.getRows(postId);
    return res.json(comments);
  } catch (err) {
    return next(err);
  }
});

// Create a comment
commentRouter.post('/:postId/comments/', async (req, res, next) => {
  const postId = req.params.postId;
  const data = req.body;
  try {
    const comment = await commentTable.createRow(postId, data);
    return res.json(comment);
  } catch (err) {
    return next(err);
  }
});

// Get one specific post by id
commentRouter.get('/:postId/comments/:commentId', async (req, res, next) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  try {
    const comment = await commentTable.getRow(postId, commentId);
    return res.json(comment);
  } catch (err) {
    return next(err);
  }
});

// Modify one specific post by id
commentRouter.put('/:postId/comments/:commentId', async (req, res, next) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const data = req.body;
  try {
    const comment = await commentTable.updateRow(postId, commentId, data);
    return res.json(comment);
  } catch (err) {
    return next(err);
  }
});

// Delete one specific post by id
commentRouter.delete('/:postId/comments/:commentId', async (req, res, next) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  try {
    await commentTable.updateRow(postId, commentId);
    return res.json({});
  } catch (err) {
    return next(err);
  }
});

// Export our post router
module.exports = commentRouter;
