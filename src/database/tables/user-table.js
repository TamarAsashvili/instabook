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

const createRow = async data => (await database.query(SQL`
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
    )
  RETURNING
    *;
`))[0] || null;

const getRows = (offset, limit) => database.query(SQL`
  SELECT
    *
  FROM
    users;
  LIMIT 
    ${limit}
  OFFSET
    ${offset};    
`);

const getRow = async id => (await database.query(SQL`
  SELECT
    *
  FROM
    users
  WHERE
    id = ${id};
`))[0] || null;

const updateRow = async (id, data) => (await database.query(SQL`
  UPDATE
    users
  SET
    first_name = ${data.firstName},
    last_name = ${data.lastName}
  WHERE
    id = ${id}
  RETURNING
    *;
`))[0] || null;

const deleteRow = id => database.query(SQL`
  DELETE FROM
    users
  WHERE
    id = ${id};
`);

module.exports = {
  createTable,
  createRow,
  getRows,
  getRow,
  updateRow,
  deleteRow
};
