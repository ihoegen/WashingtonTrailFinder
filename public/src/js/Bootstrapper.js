document.querySelector('.searchbox [type="reset"]').addEventListener('click', function() {  this.parentNode.querySelector('input').focus();});
document.getElementById('map').style.height = window.innerHeight*.60+"px";
var c = $("#myChart"), ctx = c[0].getContext('2d');

if (window.innerWidth < 500) {
  ctx.canvas.height = window.innerHeight * .4 + "px";
} else if (window.innerWidth < 1000) {
  ctx.canvas.height = 100;
}
