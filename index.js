'use strict';

// Import our webserver library
const webserver = require('./src/webserver/webserver');

// If the CTRL + C keys are pressed, exit
process.on('SIGINT', () => process.exit(128));

// Start our webserver
require('./src/webserver/webserver');
