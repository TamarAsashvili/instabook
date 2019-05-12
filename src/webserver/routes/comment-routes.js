'use strict';

// Import the Express server module
const express = require('express');
const commentTable = require('../../database/tables/comment-table');

// Create our router for our comments API
const commentRouter = express.Router();

// Get all comments
commentRouter.get('/', async (req, res, next) => {
    try {
      const comments = await commentTable.getRows();
      return res.json(comments); 
    } catch (err) {
      return next(err);
    }
  });
// Create a comment
commentRouter.post('/', async (req, res, next) => {
    const data = req.body;
    try {
      const comment = await commentTable.createRow(data);
      return res.json(coment);
    } catch (err) {
      return next(err);
    }
  });
  
// Get one specific post by id
commentRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
      const post = await commentTable.getRow(id);
      return res.json(comment);
    } catch (err) {
      return next(err);
    }
  });
  
// Modify one specific post by id
commentRouter.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    try {
      const comment = await commentTable.updateRow(id, data);
      return res.json(comment);
    } catch (err) {
      return next(err);
    }
  });
// Delete one specific post by id
commentRouter.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
      await commentTable.deleteRow(id);
      return res.json({});
    } catch (err) {
      return next(err);
    }
  });
  

// Export our post router
module.exports = commentRouter;
