var myChart;
function buildGraph(CoordArray) {
  console.log('buildGraph');
  var ctx = document.getElementById("myChart");
  var labelArray = [];
  console.log(CoordArray.length);
  for (var i = 0; i < CoordArray.length; i ++) {
    labelArray.push(i);
  }
  myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labelArray,
          datasets: [{
              label: 'Elevation',
              data: CoordArray,
          }]
      },
      options: {
          scales: {
              height: 180,
              yAxes: [{
                  ticks: {
                      beginAtZero:true
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
      for (var j = 1; j <= 10; j++) {
        newPath.push(new Coordinate(coord.lat + (j*latDif), coord.lng+ (j*lngDif)));
      }
    }
  }
  return newPath;
}
