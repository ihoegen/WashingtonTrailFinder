var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var request = require('request');
var json = require('./public/resources/TrailMap.json');


var app = express();


app.use(bodyParser());


app.get('/', function(req, res) {
  fs.readFile('./public/index.html', (err, data) => {
    if (err) {
      res.send(err);
    }
    app.use(express.static('public'));
    res.send(data.toString());
    console.log(data);
  });
});
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
  res.send(coords);
});


app.listen(8000);
