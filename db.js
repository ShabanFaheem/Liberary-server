const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "shaban@12345",
    database: "liberary_database",
    host: "localhost",
    port: 5432
})

module.exports = pool; 