const express = require("express");
const app = express();
const pool = require("./db.js");
const { partialSearch } = require("./util.js");

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    var searchtext = req.query.search;
    var partialSearchQuery = partialSearch(searchtext);
    var result1 = await pool.query(
      partialSearchQuery.qstr,
      partialSearchQuery.qarr
    );
    var result2 = await pool.query(
      "select keyword from keywords where keyword like $1",
      ["%" + searchtext + "%"]
    );
    result1.rows = result1.rows.map(function (item) {
      return item["keyword"];
    });
    result2.rows = result2.rows.map(function (item) {
      return item["keyword"];
    });
    res.json({ "Complete match": result2.rows, "Partial match": result1.rows });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, function () {
  console.log("listening to port 3000");
});
