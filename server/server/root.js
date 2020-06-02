const db = require('./db/db.js');
const router = require('./route.js')
const express = require('express')
const app = express()
var bodyParser = require("body-parser");
const path = require('path');


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(router);





app.listen(8000);
console.log(' App Running at 8000---->localhost:8000');
