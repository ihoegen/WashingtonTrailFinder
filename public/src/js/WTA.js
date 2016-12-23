var hikes;
var WtaTrailheadSearch = {};
WtaTrailheadSearch.setHikes = function(data) {
  hikes = data.filter(x => {return x.kml !== ''});
}
var error = function(err) {
  console.log("WTA Didn't work. Check Search.js");
}

var WtaRequest = {
  uri: 'http://www.wta.org/go-hiking/map/@@trailhead-search/getHikes?jsonp_callback=WtaTrailheadSearch.setHikes',
  method: 'POST',
}
request(WtaRequest, function(err, response, body) {
  eval(body);
});