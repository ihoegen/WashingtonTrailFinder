var myChart;
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
    trailLabels[trailLabels.length-1] = (trailLabels[trailLabels.length-1]/5280).toFixed(2);
    bottomLabel+= 'miles';
  } else {
    trailLabels[trailLabels.length-1] = (trailLabels[trailLabels.length-1]).toFixed(2);
    bottomLabel+= 'feet';
  }
  for(i = 0; i < trailLabels.length-1; i++) {
    if(i % (divisionFactor) === 0) {
      trailLabels[i] = (displayAsMiles) ? (trailLabels[i]/5280) : (trailLabels[i]);
      trailLabels[i] = trailLabels[i].toFixed(2);
    } else {
      trailLabels[i] = '';
    }
  }
}

function buildGraph(elevations, trailLabels, status) {
  updateData(elevations, trailLabels);
  var ctx = document.getElementById('myChart');
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: trailLabels,
      datasets: [{
        label: 'Elevation',
        data: elevations,
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
            labelString: bottomLabel
          }
        }]
      }
    }
  });
}

function updateGraph(elevations, trailLabels, status) {
  updateData(elevations, trailLabels);
  myChart.data.datasets[0].data = elevations;
  myChart.data.labels = trailLabels;
  myChart.options.scales.xAxes[0].scaleLabel.labelString = bottomLabel;
  myChart.update();


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
