var map;
var trail;
var elevator;
var allJSON;

var trailNames = {};

function Trail(name) {
  this.name = name;
}

function initMap() {
  elevator = new google.maps.ElevationService;
  var uluru = {lat: 47.582127, lng: -122.1495682};
  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: 'terrain',
    zoom: 12,
    center: uluru
  });
  trail = new google.maps.Polyline({
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
    geodesic: true,
    map: map
  });
  getTrailNames(function() {
    //Filler.
  });
  google.charts.load('current', {packages: ['corechart', 'line']});
  google.charts.setOnLoadCallback(function() {
    var lastTrail = localStorage.getItem('lastTrail');
    if (lastTrail) {
      document.getElementById('trailNameInput').value = lastTrail;
      loadNewGraph(new Trail(lastTrail), buildGraph);
    } else {
      var t = new Trail('Lena Lake Trail');
      loadNewGraph(t, buildGraph);
    }
  });
}

function loadNewGraph(t, graphFunction) {
  getTrailCoords(t, function(data) {
    elevator.getElevationAlongPath({
      'path': data,
      'samples': 256
    },function(data) {
      var distanceArray = [0];
      var feet = data.map(function(x) {
        return x.elevation * 3.28084;
      });
      var distanceArray = [0];
      var distance = 0;
      for (var i = 0; i < data.length-1; i++) {
        distance += calculateDistance({lat: data[i].location.lat(), lng: data[i].location.lng()}, {lat: data[i+1].location.lat(), lng: data[i+1].location.lng()});
        distanceArray.push(distance);
      }
      graphFunction(feet, distanceArray);
    });
    trail.setPath(data);
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < data.length; i++) {
      bounds.extend(data[i]);
    }
    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);
    google.maps.event.addListener(trail,"mouseover",function(){
      this.setOptions({strokeColor: "#00FF00"});
    });

    google.maps.event.addListener(trail,"mouseout",function(){
     this.setOptions({strokeColor: "#000000"});
    });

  });
}

// var i = -1;
// function loadGeoJSON() {
//   i++;
//   //Serves up a tenth of the total data recieved
//   if(i < Math.round(allJSON.features.length / 10)) {
//     console.log(allJSON.features[i].properties.TR_NM);
//     map.data.addGeoJson(allJSON.features[i], loadGeoJSON());
//   }
// }
//
// document.getElementById("alltrails").addEventListener("click", function(){
//   console.log('clicked.')
//   var geoJSON;
//   $.ajax({
//     type: 'POST',
//     url: 'api/alltrails'
//   }).done(function(data) {
//     console.log('Recieved data');
//     allJSON = data;
//     loadGeoJSON();
//   });
// });

function getTrailNames(callback) {
  $.ajax({
    type: 'GET',
    url: '/api/trailnames'
  }).done(function(data) {
    trailNames = data.map(function(x) {
      return x;
    });
    callback(trailNames);
  })
}

function getTrailCoords(trailObj, callback) {
  $.ajax({
    type: 'POST',
    url: '/api/trails',
    data: trailObj,
  }).done(function(data) {
    myGoogleCoords = data.map(function(x) {
      return new google.maps.LatLng({lat: x.lat, lng: x.lng});
    });
    console.log(myGoogleCoords);
    callback(myGoogleCoords);
  });
}
