'use strict';

// Import the Express server module
const express = require('express');

// Import our configuration
const config = require('../../config');

// Create our server
const app = express();

// Make the server listen on a port
app.listen(config.webserver.port, err => {
  if (err) throw err;
  console.log(`Webserver listening on http://localhost:${config.webserver.port}/`);
});
