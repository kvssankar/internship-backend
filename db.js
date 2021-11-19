const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "internship",
//   password: "sankarvishnu23",
//   port: 5432,
// });
const connectionString =
  process.env.DATABASE_URL ||
  "postgres://bjmcwdul:sWzT9lzGeqcoVyElAC9l35KQIhYjwFzR@rosie.db.elephantsql.com/bjmcwdul";
const pool = new Pool({ connectionString });

module.exports = pool;
