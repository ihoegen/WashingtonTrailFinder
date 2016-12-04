var map;
var poly;
var datasetCount;
function closePolyLine() {
  logElevation(traverseLine(poly.getPath()));
  poly = new google.maps.Polyline({
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  });
  // poly.addListener('click', closePolyLine);
  poly.addListener('click', closePolyLine);
  poly.setMap(map);
}


function logElevation(path) {
  var labels = [0];
  var array = [];
  for (var i = 0; i < path.length; i++) {
    var coordsAtLoc = new Coordinate(path[i].lat, path[i].lng);
    if (i !== path.length - 1) {
      labels.push(calculateDistance(coordsAtLoc, new Coordinate(path[i+1].lat, path[i+1].lng)) + labels[i]);
    }
    getElevation(coordsAtLoc, function(data) {
      var progress = Math.round(100*array.length/path.length) + "% complete";
      console.log(progress);
      document.getElementById('loading').innerHTML = progress;
      array.push(data);
      if(array.length == path.length) {
        buildGraph(array, labels);
        document.getElementById('loading').innerHTML = "";
      }
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
    zoom: 14,
    center: uluru
  });

  poly = new google.maps.Polyline({
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  });

  map.addListener("bounds_changed", function(e) {
    // alert(map.getBounds());
  });
  poly.setMap(map);
  poly.addListener('click', function() {
    logElevation(traverseLine(poly.getPath()));
  });
  // Add a listener for the click event
  map.addListener('click', addLatLng);

  var overlay;
}

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
    callback(parseFloat(data))
  });

}
