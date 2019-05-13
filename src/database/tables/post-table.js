'use strict';

const database = require('../database');
const SQL = require('pg-template-tag').default;

const createTable = () => database.query(`
  CREATE TABLE IF NOT EXISTS
    posts
    (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NULL,
      user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE
    );
`);

const createRow = async data => (await database.query(SQL`
  INSERT INTO
    posts
    (
      title,
      content,
      user_id
    )
  VALUES
    (
      ${data.title},
      ${data.content},
      ${data.userId}
    )
  RETURNING
    *;
`))[0] || null;

const getRows = () => database.query(`
  SELECT
    *
  FROM
    posts;
`);

const getRow = async id => (await database.query(SQL`
  SELECT
    *
  FROM
    posts
  WHERE
    id = ${id};
`))[0] || null;

const updateRow = async (id, data) => (await database.query(SQL`
  UPDATE
    posts
  SET
    title = ${data.title},
    content = ${data.content}
  WHERE
    id = ${id}
  RETURNING
    *;
`))[0] || null;

const deleteRow = id => database.query(SQL`
  DELETE FROM
    posts
  WHERE
    id = ${id};
`);

const getUsersRows = () => database.query(`
  SELECT
    users.first_name,
    users.last_name,
    posts.*
  FROM
    users
  INNER JOIN
    posts
    ON posts.user_id = users.id;
`);

module.exports = {
  createTable,
  createRow,
  getRows,
  getRow,
  updateRow,
  deleteRow,
  getUsersRows
};
