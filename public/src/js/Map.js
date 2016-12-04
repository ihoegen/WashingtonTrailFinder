var map;
var poly;
function closePolyLine() {
  logElevation(poly.getPath());
  console.log("Closing polyline....");
  poly = new google.maps.Polyline({
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  });
  // poly.addListener('click', closePolyLine);
  poly.addListener('click', function () {
    logElevation(this.getPath());
  });
  poly.setMap(map);
}


function logElevation(path) {
  for (var i = 0; i < path.getLength(); i++) {
    getElevation(new Coordinate(path.getAt(i).lat(), path.getAt(i).lng()), function(data) {
      console.log(data);
    });
  }
}
// Handles click events on a map, and adds a new point to the Polyline.
function addLatLng(event) {
  var path = poly.getPath();
  path.push(event.latLng);
}

function initMap() {
  var uluru = {lat: 47.582127, lng: -122.1495682};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 20,
    center: uluru
  });

  poly = new google.maps.Polyline({
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  });

  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });;
  map.addListener("bounds_changed", function(e) {
    // alert(map.getBounds());
  });
  poly.setMap(map);
  poly.addListener('click', closePolyLine);
  // Add a listener for the click event
  map.addListener('click', addLatLng);

  var overlay;
  drawRandomLines(map);
}

// function drawRandomLines(map) {
//   var data =  new Coordinate(47.582127, -122.1495682);
//   var seg = new LineSegment(data);
//   seg.Add(new Coordinate(12, 21));
//   console.log(seg.SegmentArray);
//   console.log(seg.Get(1));
//
//   var line = [
//   {lat: Math.random()*45, lng: Math.random()*360 - 180},
//   {lat: Math.random()*45, lng: Math.random()*360 - 180},
//   {lat: Math.random()*45, lng: Math.random()*360 - 180},
//   {lat: Math.random()*45, lng: Math.random()*360 - 180}
// ];
// var lineObj = new google.maps.Polyline({
//   path: line,
//   geodesic: true,
//   strokeColor: '#FF0000',
//   strokeOpacity: 1.0,
//   strokeWeight: 2
// });
// lineObj.setMap(map);
// }

function Coordinate(lat, lng) {
  this.lat = lat;
  this.lng = lng;
}

function LineSegment(Start) {
  this.SegmentArray = [Start];
  this.root = Start;
  var _this = this;
  this.Add = function(Coordinate) {
    _this.SegmentArray.push(Coordinate);
  }
  this.Get = function(index) {
    return _this.SegmentArray[index];
  }
  this.GetArray = function() {
    return SegmentArray;
  }
  this.AddMultiple = function(CoordArray) {
    for (var i in CoordArray) {
      _this.SegmentArray.push(CoordArray[i])
    }
  }
}

function getElevation(CoordinateObj, callback) {
  $.ajax({
    type: 'POST',
    url: '/api/elevation/',
    data: CoordinateObj,
  }).done(function(data) {
    callback(data)
  });

}
