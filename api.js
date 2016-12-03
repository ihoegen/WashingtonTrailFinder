var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser());

app.use(express.static('public'));

app.get('/api/', function (req, res){
  var exec = require('child_process').exec;
  var child = exec('java Test Hello', {cwd: './'}, function(err, stdout, stderr) {
    console.log(stdout);
    res.send(stdout)
  });
});


app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});
