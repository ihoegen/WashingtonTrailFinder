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
      var feet = data.map(function(x) {
        return x.elevation * 3.28084;
      });
      buildGraph(feet);
    });
    trail.setPath(data);
    //Middle-ish of trail.
    map.setCenter(data[Math.round(data.length / 2)]);
  });
}

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
