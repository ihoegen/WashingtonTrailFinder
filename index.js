var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var request = require('request');
var json = require('./public/resources/TrailMap.json');


var app = express();


app.use(bodyParser());

app.get('/', function(req, res) {
  fs.readFile('./public/index.html', (err, data) => {
    // if (err) throw err;
    if (err) {
      res.send(err);
    }
    app.use(express.static('public'));
    res.send(data.toString());
  });
});


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
  fs.appendFile("logs/logs.log", trails[0].properties.TR_NM
                                +"---"+ req.headers['x-forwarded-for']
                                +"---"+ new Date() + '\r\n', function(err) {
    if (err) throw err;
  });
  res.send(coords);
});


app.listen(process.env.PORT || 8000);
