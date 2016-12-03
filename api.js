var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();


app.use(bodyParser());

app.use(express.static('public'));

app.post('/api/elevation', function (req, res){
  var exec = require('child_process').exec;
  console.log(req.body);
  var lat = req.body.lat;
  var lng = req.body.lng;
  var child = exec('java -cp ./public/src/java/ Coordinates ' + lat + " " + lng, {cwd: './'}, function(err, stdout, stderr) {
    var result = JSON.parse(stdout);
    res.send(result.results[0].elevation + "");
  });
});


app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});
