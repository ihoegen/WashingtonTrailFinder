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
  var json = require('./public/resources/TrailMap.json');
  var properties = [];

  var properties = json.features.map(function(x) {
    return x;
  });
  function Coordinate(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }
  var crystalLake = properties.filter(function(trail) {
    return trail.properties.TR_NUM === '810'
  });
  var crystalLakeCoords = crystalLake.map(function(e) {
    return e.geometry.coordinates;
  });
  //This is just how the JSON file is, there's an array of an array...
  var gmapsReadyCoords = crystalLakeCoords[0].map(function(x) {
    return {lat: x[1], lng: x[0]};
  });
  res.send(gmapsReadyCoords);
})


app.listen(8000);
