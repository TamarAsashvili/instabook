'use strict';

const express = require('express');
const postTable = require('../../database/tables/post-table');
const commentTable = require('../../database/tables/comment-table');

const viewRouter = express.Router();

viewRouter.get('/users-posts', async (req, res, next) => {
  try {
    const usersPosts = await postTable.getUsersRows();
    return res.json(usersPosts);
  } catch (err) {
    return next(err);
  }
});

viewRouter.get('/users-comments', async (req, res, next) => {
  try {
    const usersComments = await commentTable.getUsersRows();
    return res.json(usersComments);
  } catch (err) {
    return next(err);
  }
});

module.exports = viewRouter;
