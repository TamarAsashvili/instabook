'use strict';

// Import the Express server module
const express = require('express');
const userTable = require('../../database/tables/user-table');

// Create our router for our users API
const userRouter = express.Router();

// Get all users
userRouter.get('/', async (req, res) => {
  try {
    const users = await userTable.getRows();
    res.json(users); 
  } catch (err) {
    console.error(err);
    res.status(500).json({});
  }
});

// Create a user
userRouter.post('/', async (req, res) => {
  const data = req.body;
  try {
    const users = await userTable.createRow(data);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({});
  }
});

// Get one specific user by id
userRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = (await userTable.getRow(id))[0];
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({});
  }
});

// Modify one specific user by id
userRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const user = (await userTable.updateRow(id, data))[0];
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({});
  }
});

// Delete one specific user by id
userRouter.delete('/:id', (req, res) => res.json({}));

// Export our user router
module.exports = userRouter;
