const db = require("./config/db");
const mysql = require("mysql");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const postRoute = require("./routes/post");
const userRoute = require("./routes/user");
const commentRoute = require("./routes/comment");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

db.connect(function (err) {
  if (err) {
    console.log("connect error" + err.stack);
  }
  console.log("Mysql  connected ...");
});

postRoute(app);
userRoute(app);
commentRoute(app);
app.listen(8000, () => {
  console.log(`Server startied on port 8000`);
});

app.get("/", (req, res) => {
  res.send("Hello Welcome to my web");
});
