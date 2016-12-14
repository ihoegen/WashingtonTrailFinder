var map;
var trail;
var elevator;

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


  getTrailCoords('Crystal Lake', function(data) {
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
      buildGraph(feet, distanceArray);
    });
    trail.setPath(data);
    //Middle-ish of trail.
    map.setCenter(data[Math.round(data.length / 2)]);
  });
}

document.getElementById("alltrails").addEventListener("click", function(){
  console.log('clicked.')
  var geoJSON;
  $.ajax({
    type: 'POST',
    url: 'api/alltrails'
  }).done(function(data) {
    console.log('Recieved data');
    map.data.addGeoJson(data);
  });
});

function getTrailCoords(trail, callback) {
  var coords;
  $.ajax({
    type: 'POST',
    url: '/api/trails',
    data: trail
  }).done(function(data) {
    myGoogleCoords = data.map(function(x) {
      return new google.maps.LatLng({lat: x.lat, lng: x.lng});
    });
    callback(myGoogleCoords);
  });
}
