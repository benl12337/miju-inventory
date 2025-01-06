const  { Pool } = require("pg");

module.exports = new Pool({
    host: "localhost",
    user: "odin",
    database: "miju",
    password: "grind",
    port: 5432
});

