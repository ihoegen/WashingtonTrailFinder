var express = require('express');
var fs = require('fs-extra');
var bodyParser = require('body-parser');
var request = require('request');
var json = require('./public/resources/TrailMap.json');
//Pre Processing FTW
var names = json.features.map(function(x) {
  return x.properties.TR_NM;
});

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


app.get('/api/trailnames', function(req, res) {
  res.send(names);
})

app.post('/api/trails', function(req, res) {
  console.log(req.body.name);
  var properties = json.features.map(function(x) {
    return x;
  });
  var trails = properties.filter(function(trail) {
    if (trail.properties.TR_NM && req.body.name) {
      return trail.properties.TR_NM.trim().toUpperCase() === req.body.name.trim().toUpperCase();
    }
  });
  var jsonCoords = trails.map(function(e) {
    return e.geometry.coordinates;
  });
  var coords;
  //This is just how the JSON file is, there's an array of an array...
  if (jsonCoords[0][0]) {
    coords = jsonCoords[0][0].map(function(x) {
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
  res.send(json);
})


app.listen(process.env.PORT || 8000);
