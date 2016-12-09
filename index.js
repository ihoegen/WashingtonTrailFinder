var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();


app.use(bodyParser());

app.use(express.static('public'));

app.post('/api/elevation', function (req, res){
  var exec = require('child_process').exec;
  var lat = req.body.lat;
  var lng = req.body.lng;
  var child = exec('java -cp ./src/java/ Elevation ' + lat + " " + lng, {cwd: './'}, function(err, stdout, stderr) {
    var result = JSON.parse(stdout);
    res.send(result.results[0].elevation + "");
  });
});

app.post('/api/trails', function(req, res) {
  var exec = require('child_process').exec;
  var trailName = req.body;
  var json = require('./public/resources/TrailMap.json');
  var properties = [];
  for(var i = 0; i < json.features.length; i++) {
    properties.push(json.features[i]);
  }
  var trail = properties.filter(function(trail) {
    return trail.properties.TR_NM === trailName
  });
  console.log(trail[0].geometry);
  res.send(trail[0].geometry);
})


app.listen(8000);
