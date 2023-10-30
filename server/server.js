const express = require('express');
const { router } = require("./router.js");

let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", router);

app.listen(3000, function () {
  console.log('port 3000');
});