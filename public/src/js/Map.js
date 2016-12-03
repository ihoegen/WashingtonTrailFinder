var fs = require('fs');

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
  drawRandomLines(map);
};

function drawRandomLines(map) {
  var data =  new Coordinate(47.582127, -122.1495682);
  var seg = new LineSegment(data);
  seg.Add(new Coordinate(12, 21));
  console.log(seg.SegmentArray);
  console.log(seg.Get(1));

  var line = [
  {lat: Math.random()*45, lng: Math.random()*360 - 180},
  {lat: Math.random()*45, lng: Math.random()*360 - 180},
  {lat: Math.random()*45, lng: Math.random()*360 - 180},
  {lat: Math.random()*45, lng: Math.random()*360 - 180}
];
var lineObj = new google.maps.Polyline({
  path: line,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2
});
lineObj.setMap(map);
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
