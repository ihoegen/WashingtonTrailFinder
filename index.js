var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var request = require('request');
var json = require('./public/resources/TrailMap.json');


var app = express();
app.use(bodyParser());
app.use(express.static('public'));


app.post('/api/trails', function(req, res) {
  var properties = json.features.map(function(x) {
    return x;
  });
  var trails = properties.filter(function(trail) {
    return trail.properties.TR_NUM === '810'
  });
  var jsonCoords = trails.map(function(e) {
    return e.geometry.coordinates;
  });
  //This is just how the JSON file is, there's an array of an array...
  var coords = jsonCoords[0].map(function(x) {
    return {lat: x[1], lng: x[0]};
  });
  fs.appendFile("logs/ip_logs.db", (req.headers['x-forwarded-for'] + " On " + new Date() + "\r\n"), function(err) {
  });
  res.send(coords);
});


app.listen(8000);
