const  { Pool } = require("pg");
require("dotenv").config();

module.exports = new Pool({
    connectionString: process.env.DATABASE_URL,
    // connectionString: postgresql://<role_name>:<role_password>@localhost:5432/top_users
});

