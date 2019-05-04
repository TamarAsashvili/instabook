'use strict';

// Import the Express server module
const express = require('express');

// Create our router for our posts API
const postRouter = express.Router();

// Get all posts
postRouter.get('/', (req, res) => res.json({}));

// Create a post
postRouter.post('/', (req, res) => res.json({}));

// Get one specific post by id
postRouter.get('/:id', (req, res) => res.json({}));

// Modify one specific post by id
postRouter.put('/:id', (req, res) => res.json({}));

// Delete one specific post by id
postRouter.delete('/:id', (req, res) => res.json({}));

// Export our post router
module.exports = postRouter;
