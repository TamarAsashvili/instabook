'use strict';

const SQL = require('pg-template-tag').default;

const database = require('../../../src/database/database');
const userTable = require('../../../src/database/tables/user-table');

describe('User table', () => {
  const resetUserTable = async () => {
    await userTable.createTable();
    await database.query('DELETE FROM users');
  };
  beforeEach(resetUserTable);
  afterEach(resetUserTable);

  test('createRow() - can create a user', async () => {
    const createdUser = await userTable.createRow({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com'
    });
    // Check that the first name returned by the database is equal to the one we set  
    expect(createdUser.first_name).toBe('John');
    // Check that the last name returned by the database is equal to the one we set
    expect(createdUser.last_name).toBe('Doe');
    // Check that the email returned by the database is equal to the one we set
    expect(createdUser.email).toBe('john@doe.com');
    // Check that an id was generated and is a positive integer
    expect(createdUser.id).toBeGreaterThanOrEqual(1);

    // Check that only one user exists in the database
    const userCount = (await database.query('SELECT COUNT(*)::INTEGER FROM users'))[0].count;
    expect(userCount).toBe(1);

    // Check that the user in the database is the same one that we created
    const foundUser = (await database.query(SQL`
      SELECT
        *
      FROM
        users
      WHERE
        id = ${createdUser.id};
    `))[0];
    expect(foundUser).toEqual(createdUser);
  });

  test('getRows() - can find all users', async () => {
    // Create two users for this test only
    await database.query(`
      INSERT INTO
        users
        (
          id,
          first_name,
          last_name,
          email
        )
      VALUES
        (
          42,
          'John',
          'Doe',
          'john@doe.com'
        ),
        (
          24,
          'Elon',
          'Musk',
          'elon@musk.com'
        );
    `);

    const foundUsers = await userTable.getRows();
    // Check that two users were resturned
    expect(foundUsers.length).toBe(2);
    // Check that the first name returned by the database is equal to the one we set  
    expect(foundUsers[0].first_name).toBe('John');
    // Check that the last name returned by the database is equal to the one we set
    expect(foundUsers[0].last_name).toBe('Doe');
    // Check that the email returned by the database is equal to the one we set
    expect(foundUsers[0].email).toBe('john@doe.com');
    // Check that an id was generated and is a positive integer
    expect(foundUsers[0].id).toBe(42);
    // Check that the first name returned by the database is equal to the one we set  
    expect(foundUsers[1].first_name).toBe('Elon');
    // Check that the last name returned by the database is equal to the one we set
    expect(foundUsers[1].last_name).toBe('Musk');
    // Check that the email returned by the database is equal to the one we set
    expect(foundUsers[1].email).toBe('elon@musk.com');
    // Check that an id was generated and is a positive integer
    expect(foundUsers[1].id).toBe(24);
  });

  test('getRow() - can find one user by id', async () => {
    // Create a user for this test only
    await database.query(`
      INSERT INTO
        users
        (
          id,
          first_name,
          last_name,
          email
        )
      VALUES
        (
          42,
          'John',
          'Doe',
          'john@doe.com'
        );
    `);

    const foundUser = await userTable.getRow(42);
    // Check that the first name returned by the database is equal to the one we set  
    expect(foundUser.first_name).toBe('John');
    // Check that the last name returned by the database is equal to the one we set
    expect(foundUser.last_name).toBe('Doe');
    // Check that the email returned by the database is equal to the one we set
    expect(foundUser.email).toBe('john@doe.com');
    // Check that an id was generated and is a positive integer
    expect(foundUser.id).toBe(42);
  });

  test('updateRow() - can modify one user by id', async () => {
    // Create a user for this test only
    await database.query(`
      INSERT INTO
        users
        (
          id,
          first_name,
          last_name,
          email
        )
      VALUES
        (
          42,
          'John',
          'Doe',
          'john@doe.com'
        );
    `);

    const updatedUser = await userTable.updateRow(42, {
      firstName: 'Michael',
      lastName: 'Jordan'
    });
    // Check that the first name returned by the database is equal to the one we set  
    expect(updatedUser.first_name).toBe('Michael');
    // Check that the last name returned by the database is equal to the one we set
    expect(updatedUser.last_name).toBe('Jordan');
    // Check that the email returned by the database is equal to the one we set
    expect(updatedUser.email).toBe('john@doe.com');
    // Check that an id was generated and is a positive integer
    expect(updatedUser.id).toBe(42);
  });

  test('deleteRow() - can delete one user by id', async () => {
    // Create a user for this test only
    await database.query(`
      INSERT INTO
        users
        (
          id,
          first_name,
          last_name,
          email
        )
      VALUES
        (
          42,
          'John',
          'Doe',
          'john@doe.com'
        );
    `);

    await userTable.deleteRow(42);

    // Check that only one user exists in the database
    const userCount = (await database.query('SELECT COUNT(*)::INTEGER FROM users'))[0].count;
    expect(userCount).toBe(0);
  });
});
