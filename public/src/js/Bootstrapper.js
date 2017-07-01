document.querySelector('.searchbox [type="reset"]').addEventListener('click', function() {  this.parentNode.querySelector('input').focus();});
document.getElementById('map').style.height = window.innerHeight*.60+"px";
var query = window.location.search.substring(1);
var querySplit = null;
if (query) {
  querySplit = query.split("=");
}
if (querySplit && querySplit[0] == 'trail') {
  var trailName = decodeURIComponent(querySplit[1]);
  history.pushState(null, null, "trail/" + trailName);
  localStorage.setItem('lastTrail', trailName);
}