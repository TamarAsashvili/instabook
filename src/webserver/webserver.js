'use strict';

// Import the Express server module
const express = require('express');

// Import our configuration
const config = require('../../config');

// Create our server
const app = express();

// Setup our user routes
app.use('/api/users', require('./routes/user-routes'));
// Setup our post routes
app.use('/api/posts', require('./routes/post-routes'));
// Setup our comment routes
app.use('/api/posts/:id/comments', require('./routes/comment-routes'));

// Make the server listen on a port
app.listen(config.webserver.port, err => {
  if (err) throw err;
  console.log(`Webserver listening on http://localhost:${config.webserver.port}/`);
});
