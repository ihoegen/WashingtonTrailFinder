
function initMap() {
  var uluru = {lat: 47.582127, lng: -122.1495682};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 20,
    center: uluru
  });


  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });;
  map.addListener("bounds_changed", function(e) {
    alert(map.getBounds());
  });

  var overlay;
  var line = [
  {lat: 47.582127, lng: -122.1495682},
  {lat: 48.291, lng: -110.821},
  {lat: 49.142, lng: -90.431},
  {lat: 50.467, lng: -70.027}
];
var lineObj = new google.maps.Polyline({
  path: line,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2
});

lineObj.setMap(map);
};
