'use strict';

// Import the Express server module
const express = require('express');
const bodyParser = require('body-parser');

// Import our configuration
const config = require('../../config');

// Create our server
const app = express();

app.use(bodyParser.json());

// Setup our user routes
app.use('/api/users', require('./routes/user-routes'));
// Setup our post routes
app.use('/api/posts', require('./routes/post-routes'));
// Setup our comment routes
app.use('/api/posts/:id/comments', require('./routes/comment-routes'));

app.use((err, req, res, next) => {
  console.error('Oops, we got an error:', err);
  if (!res.headersSent) {
    res.status(500).json({});
  }
});

// Make the server listen on a port
app.listen(config.webserver.port, err => {
  if (err) throw err;
  console.log(`Webserver listening on http://localhost:${config.webserver.port}/`);
});
