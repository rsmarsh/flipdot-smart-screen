const pg = require('pg');

let client;
let clientConnected = false;
let remainingConnectAttempts = 25;

// can be used to prevent errors from DB actions too early on
function getClientReadyStatus() {
  return clientConnected;
}

function getClient() {
  return getClientReadyStatus() && client;
}

function connectDbClient() {
  if (getClientReadyStatus()) {
    return;
  }

  // create a new instance each time so it doesn't consider failed clients as "used"
  let potentialClient = new pg.Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  });

  remainingConnectAttempts -= 1;

  potentialClient.connect((err) => {
    if (err) {
      console.error(
        `
          Failed to connect to PostgreSQL. 
          ${remainingConnectAttempts} attempts remaining. 
          Could still be initialising?
          Retrying in 5 seconds...
        `,
        err
      );

      if (remainingConnectAttempts > 0) {
        setTimeout(connectDbClient, 5000);
      } else {
        console.log('No DB connection attempts remaining, giving up.');
      }
    } else {
      clientConnected = true;
      client = potentialClient;
      console.log('DB client connection successful!');
    }
  });
}

// start the connection attempts, these can often fail on the first launch while setting up the DB
connectDbClient();

module.exports = { getClient, getClientReadyStatus };
