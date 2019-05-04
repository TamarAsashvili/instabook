'use strict';

// Import the Express server module
const express = require('express');

// Create our router for our users API
const userRouter = express.Router();

// Get all users
userRouter.get('/', (req, res) => res.json({}));

// Get one specific user by id
userRouter.get('/:id', (req, res) => res.json({}));

// Modify one specific user by id
userRouter.put('/:id', (req, res) => res.json({}));

// Delete one specific user by id
userRouter.delete('/:id', (req, res) => res.json({}));

// Export our user router
module.exports = userRouter;
