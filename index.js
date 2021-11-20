const express = require("express");
const app = express();
const pool = require("./db.js");

const { partialSearch, checkSearchString } = require("./util.js");

app.use(express.json());

const cors = require("cors");
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,auth-token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.get("/", async (req, res) => {
  try {
    //getting search text from the url
    var searchtext = req.query.search;

    //checking if search text is empty or not
    var check = await checkSearchString(searchtext);
    if (check.status == 0) {
      return res.status(400).json({
        status: 0,
        message: check.message,
      });
    }

    //getting search query
    var partialSearchQuery = partialSearch(searchtext);
    var fullSeacrhQuery =
      "select keyword from keywords where lower(keyword) like lower($1)";

    //get for page pageSize,page
    var page = +req.query.page;
    var pageSize = +req.query.pageSize || 20;

    if (page) {
      partialSearchQuery.qstr +=
        " limit " + pageSize + " offset " + (page - 1) * pageSize;
      fullSeacrhQuery +=
        " limit " + pageSize + " offset " + (page - 1) * pageSize;
    }

    var result1 = await pool.query(
      partialSearchQuery.qstr,
      partialSearchQuery.qarr
    );

    //getting full search query
    var result2 = await pool.query(fullSeacrhQuery, ["%" + searchtext + "%"]);

    //coverting the result to array of string
    result1.rows = result1.rows.map(function (item) {
      return item["keyword"];
    });
    result2.rows = result2.rows.map(function (item) {
      return item["keyword"];
    });

    //sending the result
    res.json({ "Complete match": result2.rows, "Partial match": result1.rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err || "Something went wrong" });
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log("listening to port 3000");
});
