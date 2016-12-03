var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();


app.use(bodyParser());

app.use(express.static('public'));

app.get('/api/test', function (req, res) {
  var exec = require('child_process').exec;
  var child = exec('java Test Hello', {cwd: './'}, function(err, stdout, stderr) {
    console.log(stdout);
    res.send(stdout)
  });
});

app.post('/api/elevation', function (req, res){
  console.log(req.body);
  var lat = req.body.lat;
  var lng = req.body.lng;

  request('https://maps.googleapis.com/maps/api/elevation/json?locations=' + lat + ',' + lng + '&key=AIzaSyCZvfnTZCqtieHQH1Vsmby3kT_sGZ5K1UI', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var result = JSON.parse(body);
    res.send(result.results[0].elevation + "");
  }
})
});


app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});
