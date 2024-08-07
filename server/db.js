const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "pern-todo",
  port: 5432,
});

module.exports = pool
