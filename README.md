# InstaBook

A simple social network example in Node.js for the HackYourFuture course.

## Installation

To install and run the project, follow these steps:

1. Clone the Git project off of GitHub:

`git clone git@github.com:Mickael-van-der-Beek/instabook.git`

2. Browse to the project folder in your terminal

`cd instabook`

3. Build the Docker image

`docker-compose build node`

4. Start the Docker container

`docker-compose up node`

Every time you add a Node.js dependency, you'll need to rerun the step 3. and 4.

## Technologies

For this project, the following technologies will be used:

- [Node.js](https://nodejs.org/dist/latest-v10.x/docs/api/), back-end language
- [Express](https://github.com/expressjs/express), web server
- [PostgreSQL](https://www.postgresql.org/docs/11/sql-select.html), database server
- [PG](https://github.com/brianc/node-postgres), database client

## Todo

### User related CRUD tasks

- [ ] users table
- [ ] user(s) retrieval functions and database queries
- [ ] user creation function and database query
- [ ] user modification function and database query
- [ ] user deletion function and database query

### Post related CRUD tasks

- [ ] posts table
- [ ] post(s) retrieval functions and database queries
- [ ] post creation function and database query
- [ ] post modification function and database query
- [ ] post deletion function and database query

### Comment related CRUD tasks

- [ ] comments table
- [ ] comment(s) retrieval functions and database queries
- [ ] comment creation function and database query
- [ ] comment modification function and database query
- [ ] comment deletion function and database query

### Filtering, sorting and pagination

- [ ] filter users by handle
- [ ] filter posts by user
- [ ] filter comments by post
- [ ] sort users by id
- [ ] sort posts by likes
- [ ] sort comments by creation date
- [ ] paginate users retrieval
- [ ] paginate posts retrieval
- [ ] paginate comments retrieval

### Performance

- [ ] Index user queries
- [ ] Index post queries
- [ ] Index comment queries

### Security

- [ ] Prevent SQL injections
- [ ] Prevent race conditions

### Adanced queries

- [ ] aggregation queries
- [ ] sub-queries and CTEs
- [ ] LIKE and RegExp operators
- [ ] array operators
