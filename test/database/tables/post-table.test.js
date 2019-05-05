'use strict';

const SQL = require('pg-template-tag').default;

const database = require('../../../src/database/database');
const postTable = require('../../../src/database/tables/post-table');

describe('Post table', () => {
  const resetPostTable = async () => {
    await postTable.createTable();
    await database.query('DELETE FROM posts');
  };
  beforeEach(resetPostTable);
  afterEach(resetPostTable);

  test('createRow() - can create a post', async () => {
    const createdPost = await postTable.createRow({
      title: 'My awesome post',
      content: 'This is my first post on the social network!',
      user_id: 42
    });
    // Check that the first name returned by the database is equal to the one we set  
    expect(createdPost.title).toBe('My awesome post');
    // Check that the last name returned by the database is equal to the one we set
    expect(createdPost.content).toBe('This is my first post on the social network!');
    // Check that the user_id returned by the database is equal to the one we set
    expect(createdPost.user_id).toBe(42);
    // Check that an id was generated and is a positive integer
    expect(createdPost.id).toBeGreaterThanOrEqual(1);

    // Check that only one post exists in the database
    const postCount = (await database.query('SELECT COUNT(*)::INTEGER FROM posts'))[0].count;
    expect(postCount).toBe(1);

    // Check that the post in the database is the same one that we created
    const foundPost = (await database.query(SQL`
      SELECT
        *
      FROM
        posts
      WHERE
        id = ${createdPost.id};
    `))[0];
    expect(foundPost).toEqual(createdPost);
  });

  test('getRows() - can find all posts', async () => {
    // Create two posts for this test only
    await database.query(`
      INSERT INTO
        posts
        (
          id,
          title,
          content,
          user_id
        )
      VALUES
        (
          123,
          'My awesome post',
          'This is my first post on the social network!',
          42
        ),
        (
          456,
          'My other post',
          'This is my second post on the social network!',
          24
        );
    `);

    const foundPosts = await postTable.getRows();
    // Check that two posts were resturned
    expect(foundPosts.length).toBe(2);
    // Check that the first name returned by the database is equal to the one we set  
    expect(foundPosts[0].title).toBe('My awesome post');
    // Check that the last name returned by the database is equal to the one we set
    expect(foundPosts[0].content).toBe('This is my first post on the social network!');
    // Check that the user_id returned by the database is equal to the one we set
    expect(foundPosts[0].user_id).toBe(42);
    // Check that an id was generated and is a positive integer
    expect(foundPosts[0].id).toBe(123);
    // Check that the first name returned by the database is equal to the one we set  
    expect(foundPosts[1].title).toBe('My other post');
    // Check that the last name returned by the database is equal to the one we set
    expect(foundPosts[1].content).toBe('This is my second post on the social network!');
    // Check that the user_id returned by the database is equal to the one we set
    expect(foundPosts[1].user_id).toBe(24);
    // Check that an id was generated and is a positive integer
    expect(foundPosts[1].id).toBe(456);
  });

  test('getRow() - can find one post by id', async () => {
    // Create a post for this test only
    await database.query(`
      INSERT INTO
        posts
        (
          id,
          title,
          content,
          user_id
        )
      VALUES
        (
          123,
          'My awesome post',
          'This is my first post on the social network!',
          42
        );
    `);

    const foundPost = await postTable.getRow(123);
    // Check that the first name returned by the database is equal to the one we set  
    expect(foundPost.title).toBe('My awesome post');
    // Check that the last name returned by the database is equal to the one we set
    expect(foundPost.content).toBe('This is my first post on the social network!');
    // Check that the user_id returned by the database is equal to the one we set
    expect(foundPost.user_id).toBe(42);
    // Check that an id was generated and is a positive integer
    expect(foundPost.id).toBe(123);
  });

  test('updateRow() - can modify one post by id', async () => {
    // Create a post for this test only
    await database.query(`
      INSERT INTO
        posts
        (
          id,
          title,
          content,
          user_id
        )
      VALUES
        (
          123,
          'My awesome post',
          'This is my first post on the social network!',
          42
        );
    `);

    const updatedPost = await postTable.updateRow(123, {
      title: 'My great post',
      content: 'This is an updated post on the social network'
    });
    // Check that the first name returned by the database is equal to the one we set  
    expect(updatedPost.title).toBe('My great post');
    // Check that the last name returned by the database is equal to the one we set
    expect(updatedPost.content).toBe('This is an updated post on the social network');
    // Check that the user_id returned by the database is equal to the one we set
    expect(updatedPost.user_id).toBe(42);
    // Check that an id was generated and is a positive integer
    expect(updatedPost.id).toBe(123);
  });

  test('deleteRow() - can delete one post by id', async () => {
    // Create a post for this test only
    await database.query(`
      INSERT INTO
        posts
        (
          id,
          title,
          content,
          user_id
        )
      VALUES
        (
          123,
          'My awesome post',
          'This is my first post on the social network!',
          42
        );
    `);

    await postTable.deleteRow(123);

    // Check that only one post exists in the database
    const postCount = (await database.query('SELECT COUNT(*)::INTEGER FROM posts'))[0].count;
    expect(postCount).toBe(0);
  });
});
