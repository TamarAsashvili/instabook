'use strict';

const database = require('../database');
const SQL = require('pg-template-tag').default;

const createTable = () => database.query(`
  CREATE TABLE IF NOT EXISTS
    comments
    (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      post_id INTEGER NOT NULL REFERENCES posts (id) ON DELETE CASCADE
    );
`);

const createRow = async (postId, data) => (await database.query(SQL`
  INSERT INTO
    comments
    (
      content,
      user_id,
      post_id
    )
  VALUES
    (
      ${data.content},
      ${data.userId},
      ${postId}
    )
  RETURNING
    *;
`))[0] || null;


const getRows = (postId) => database.query(`
  SELECT
    *
  FROM
    comments
  WHERE
    post_id = ${postId};
`);

const getRow = async (postId, id) => (await database.query(SQL`
  SELECT
    *
  FROM
    comments
  WHERE
    post_id = ${postId}
    AND
    id = ${id};
`))[0] || null;

const updateRow = async (postId, id, data) => (await database.query(SQL`
  UPDATE
    comments
  SET
    content = ${data.content}
  WHERE
    post_id = ${postId}
    AND
    id = ${id}
  RETURNING
    *;
`))[0] || null;

const deleteRow = (postId, id) => database.query(SQL`
  DELETE FROM
    comments
  WHERE
    post_id = ${postId}
    AND
    id = ${id};
`);


const myFunction = async ()=> (await database.query(SQL`
  SELECT
     users.first_name,
     users.last_name,
     comment.*
  FROM 
     users
  INNER JOIN
     comment
     ON comment.user_id = users.id;
     
`));


module.exports = {
  createTable,
  createRow,
  getRows,
  getRow,
  updateRow,
  deleteRow,
  myFunctio,
  getUsersRows
};
