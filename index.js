const express = require("express");
const app = express();
const pool = require("./db.js");

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    var searcktext = req.query.search;
    var arr = searcktext.split(" ");
    var qarr = [];
    var qstr = "select * from keywords where keyword like $1";
    for (var i = 0; i < arr.length; i++) {
      qarr.push("%" + arr[i] + "%");
    }
    for (var i = 2; i <= arr.length; i++) {
      qstr += " or keyword like $" + i;
    }
    console.log(qstr);
    var result = await pool.query(qstr, qarr);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, function () {
  console.log("listening to port 3000");
});
