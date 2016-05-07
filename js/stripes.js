$(document).ready(function(){
	var colors = ['#ff0000', '#ffffff', '#1c00ff'];
	setInterval(function() {
		console.log(Math.floor(Math.random() * 10))
	$('.stripe-1').css({'backgroundColor': colors[getRandomInt(0,3)]})
	$('.stripe-2').css({'backgroundColor': colors[getRandomInt(0,3)]})
	$('.stripe-3').css({'backgroundColor': colors[getRandomInt(0,3)]})
	$('.stripe-4').css({'backgroundColor': colors[getRandomInt(0,3)]})
	$('.stripe-5').css({'backgroundColor': colors[getRandomInt(0,3)]})
	$('h1').css({'textShadow': '2px 12px 15px ' + colors[getRandomInt(0,3)]})
	}, 800)
});


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}