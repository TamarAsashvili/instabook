'use strict';

const database = require('../database');
const SQL = require('pg-template-tag').default;

const createTable = () => database.query(`
  CREATE TABLE IF NOT EXISTS
    users
    (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NULL,
      email TEXT NOT NULL
    );
`);

const createRow = data => database.query(SQL`
  INSERT INTO
    users
    (
      first_name,
      last_name,
      email
    )
  VALUES
    (
      ${data.firstName},
      ${data.lastName},
      ${data.email}
    );
`);

const getRows = () => database.query(`
  SELECT
    id,
    first_name,
    last_name,
    email
  FROM
    users;
`);

const getRow = id => database.query(SQL`
  SELECT
    id,
    first_name,
    last_name,
    email
  FROM
    users
  WHERE
    id = ${id};
`);

const updateRow = (id, data) => database.query(SQL`
  UPDATE
    users
  SET
    first_name = ${data.firstName},
    last_name = ${data.lastName}
  WHERE
    id = ${id}
  RETURNING
    *;
`);

module.exports = {
  createTable,
  createRow,
  getRows,
  getRow,
  updateRow
};
