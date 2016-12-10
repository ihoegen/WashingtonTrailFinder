var myChart;
function buildGraph(elevations, status) {
  console.log(elevations);
  var elevationValues = elevations.map(function(x) {
    return x.elevation;
  });
  var labels = [];
  for(i = 0; i < elevations.length; i++) {
    labels.push(i);
  }
  var ctx = document.getElementById("myChart");
  console.log(ctx);
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Elevation',
        data: elevationValues,
        backgroundColor: 'rgba(74,158,241,.4)'
      }]
    },
    options: {
      scales: {
        height: 180,
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Elevation'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Distance in Feet'
          }
        }]
      }
    }
  });
}

function traverseLine(path) {
  var newPath = []
  for (var i = 0; i < path.getLength(); i++) {
    var coord = new Coordinate(path.getAt(i).lat(), path.getAt(i).lng());
    newPath.push(coord);
    if (i+1 < path.getLength()) {
      var nextCoord = new Coordinate(path.getAt(i+1).lat(), path.getAt(i+1).lng());
      var latDif = (nextCoord.lat - coord.lat)/10;
      var lngDif = (nextCoord.lng - coord.lng)/10;
      for (var j = 1; j < 10; j++) {
        newPath.push(new Coordinate(coord.lat + (j*latDif), coord.lng+ (j*lngDif)));
      }
    }
  }
  return newPath;
}

//Converts coordinates in degrees to radians.
function toRad(degrees) {
  return degrees * Math.PI / 180;
}

//Harvensine Formula
function calculateDistance(Coord1, Coord2) {
  //Get values of our inputs
  var lat1 = Coord1.lat;
  var lng1 = Coord1.lng;
  var lat2 = Coord2.lat;
  var lng2 = Coord2.lng;
  // Radius of earth, KM
  var radiusOfEarth = 6371;
  var lattitudeDifference = lat2 - lat1;
  var dLat = toRad(lattitudeDifference);
  var longitudeDifference = lng2 - lng1;
  var dLon = toRad(longitudeDifference);
  /*
  a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
  c = 2 ⋅ atan2( √a, √(1−a) )
  d = R ⋅ c
  where	φ is latitude, λ is longitude, R is earth’s radius
  Assumes that the earth radius is 6,371 KM
  */
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
  Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = radiusOfEarth * c;
  distance = parseFloat(distance).toFixed(2);
  var distanceInMiles = 0.62137119 * distance
  distanceInMiles = parseFloat(distanceInMiles).toFixed(2);
  return Math.round(distanceInMiles*5280);
}
