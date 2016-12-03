var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

app.use(express.static('public'));


app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});
