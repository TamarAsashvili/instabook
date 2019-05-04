'use strict';

// Import the Express server module
const express = require('express');

// Create our router for our comments API
const commentRouter = express.Router();

// Get all comments
commentRouter.get('', (req, res) => res.json({}));

// Get one specific post by id
commentRouter.get('/:id', (req, res) => res.json({}));

// Modify one specific post by id
commentRouter.put('/:id', (req, res) => res.json({}));

// Delete one specific post by id
commentRouter.delete('/:id', (req, res) => res.json({}));

// Export our post router
module.exports = commentRouter;
