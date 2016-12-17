var elevations;
var trailLabels;
var bottomLabel;

function updateData(elevations, trailLabels) {
  trailLabels = trailLabels;
  elevations = elevations;
  var divisionFactor = Math.round(trailLabels.length/(4*window.innerWidth/400));
  var displayAsMiles = false;
  bottomLabel = 'Distance in ';
  if (trailLabels[trailLabels.length-1]/5280 > .5) {
    displayAsMiles = true;
    trailLabels[trailLabels.length-1] = (trailLabels[trailLabels.length-1]/5280);
    bottomLabel+= 'miles';
  } else {
    trailLabels[trailLabels.length-1] = (trailLabels[trailLabels.length-1]);
    bottomLabel+= 'feet';
  }
  for(i = 0; i < trailLabels.length-1; i++) {
    trailLabels[i] = (displayAsMiles) ? (trailLabels[i]/5280) : (trailLabels[i]);
  }
}

function buildGraph(elevations, trailLabels, status) {
  updateData(elevations, trailLabels);
  var gChartData = [];
  var gChart = new google.visualization.DataTable();
  gChart.addColumn('number', 'Distance');
  gChart.addColumn('number', 'Elevation');
  for (var i in elevations) {
    gChartData.push([trailLabels[i], elevations[i]]);
  }
  gChart.addRows(gChartData);
  var options = {
        hAxis: {
          title: bottomLabel
        },
        vAxis: {
          title: 'Elevation'
        },
        backgroundColor: 'white'
      };
  var chart = new google.visualization.LineChart(document.getElementById('elevChart'));
  chart.draw(gChart, options);
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
  distance = parseFloat(distance);
  var distanceInMiles = 0.62137119 * distance
  distanceInMiles = parseFloat(distanceInMiles);
  return Math.abs(distanceInMiles*5280);
}
