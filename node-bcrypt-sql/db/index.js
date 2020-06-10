const { Client } = require("pg");

const client = new Client({
  connectionString: "postgresql://localhost/node-bcrypt-sql",
});

client.connect();

module.exports = client;
