'use strict';

// Import our webserver library
const webserver = require('./src/webserver/webserver');
const userTable = require('./src/database/tables/user-table');

// If the CTRL + C keys are pressed, exit
process.on('SIGINT', () => process.exit(128));

(async () => {
  await userTable.createTable();
})();
