'use strict';

// Import the Express server module
const express = require('express');
const postTable = require('../../database/tables/post-table');

// Create our router for our posts API
const postRouter = express.Router();

// Get all posts
postRouter.get('/', async (req, res, next) => {
  try {
    const posts = await postTable.getRows();
    return res.json(posts);
  } catch (err) {
    return next(err);
  }
});

// Create a post
postRouter.post('/', async (req, res, next) => {
  const data = req.body;
  try {
    const post = await postTable.createRow(data);
    return res.json(post);
  } catch (err) {
    return next(err);
  }
});

// Get one specific post by id
postRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await postTable.getRow(id);
    return res.json(post);
  } catch (err) {
    return next(err);
  }
});

// Modify one specific post by id
postRouter.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const post = await postTable.updateRow(id, data);
    return res.json(post);
  } catch (err) {
    return next(err);
  }
});

// Delete one specific post by id

postRouter.delete('/:id', async (req, res, next) => {

  const id = req.params.id;
  try {
    await postTable.deleteRow(id);
    return res.json({});
  } catch (err) {
    return next(err);
  }
});

// Export our post router
module.exports = postRouter;
