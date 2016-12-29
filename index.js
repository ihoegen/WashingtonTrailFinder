/**
 * @description Server for the application; Uses express
 ******************************************************************************/

var express = require('express');
var fs = require('fs-extra');
var bodyParser = require('body-parser');
var trailData = require('./public/resources/TrailMap.json');
var http = require('http');
var ogr2ogr = require('ogr2ogr');
//Pre Processing FTW
var names = trailData.features.map(function(x) {
  return x.properties.TR_NM;
});

var app = express();

app.use(bodyParser());

//Handles main application
app.get('/', function(req, res) {
  fs.readFile('./public/index.html', (err, data) => {
    if (err) {
      res.send(err);
    } else {
      app.use(express.static('public'));
      res.send(data.toString());
    }
  });
});

//API to get trail names
app.get('/api/trailnames', function(req, res) {
  res.send(names);
});

//API to get specific trail coords
app.post('/api/trails', function(req, res) {
  console.log(req.body.name);
  var properties = trailData.features.map(function(x) {
    return x;
  });
  var trails = properties.filter(function(trail) {
    if (trail.properties.TR_NM && req.body.name) {
      return trail.properties.TR_NM.trim().toUpperCase() === req.body.name.trim().toUpperCase();
    }
  });
  var trailCoords = trails.map(function(e) {
    return e.geometry.coordinates;
  });
  var coords;
  //This is just how the JSON file is, there's an array of an array...
  if (trailCoords[0][0]) {
    coords = trailCoords[0][0].map(function(x) {
      return {lat: parseFloat((x[1])), lng: parseFloat(x[0])};
    });
    var log = trails[0].properties.TR_NM +"---"+ req.headers['x-forwarded-for']+"---"+ new Date() + '\r\n';
  } else {
    var log = req.body.name  +"---"+ req.headers['x-forwarded-for']+"---"+ new Date() + '\r\n';
  }
  console.log(log);
  fs.ensureFileSync("public/logs/logs.log");
  fs.appendFile("public/logs/logs.log", log, function(err) {
    if (err) throw err;
  });
  if (coords) {
    res.send(coords);
  } else {
    res.sendStatus(400);
  }
});


app.post('/api/alltrails',function(req, res) {
  console.log('Loaded. Sending data...');
  res.send(trailData);
})


app.listen(process.env.PORT || 8000);
