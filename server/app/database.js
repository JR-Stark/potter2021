const pg = require("pg");

// il faut définir les informations de connexion dans un .env
const client = new pg.Client(process.env.PG_URL);

// Je connecte mon client
client.connect();

// j'exporte mon module client
module.exports = client;