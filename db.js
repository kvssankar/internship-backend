const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "internship",
  password: "sankarvishnu23",
  port: 5432,
});

module.exports = pool;
