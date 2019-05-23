'use strict';

const pg = require('pg');

const pool = pg.Pool({
 connectionString: 'postgres://postgres:postgres@postgresql:5432/instabook'
  //connectionString: 'postgres://postgres:postgres@localhost:5432/instabook'
});

const query = async query => (await pool.query(query)).rows;

module.exports = {
  query
};
