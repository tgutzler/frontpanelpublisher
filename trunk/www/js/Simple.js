$(document).ready(function() {
// variables for created objects
var btn435_clicked = false;
var btn1663_clicked = false;
var btn467_clicked = false;
var plot1 = $.jqplot("UID313", [[0]],{
				series: [{
				yaxis: 'y2axis',
				label: 'Amplitude',
				showMarker: false,
				fill: false,
				neighborThreshold: 3,
				lineWidth: 2.2,
				color: '#0571B6',
				fillAndStroke: true}]});


// function to get all data required to populate indicators
function GetData(){
	$.get("GetData?Page=Simple", 
		function(res){
// object specific code to manipulate variables defined above
if (!($("#UID371:focus").is( ":focus" ))) {
  $("#UID371").val(res.UID371);
}
btn435_clicked = res.UID435;
if ( btn435_clicked ) {
	$("#UID435").text("Append");
} else {
	$("#UID435").text("Append");
}
btn1663_clicked = res.UID1663;
if ( btn1663_clicked ) {
	$("#UID1663").text("Stop");
} else {
	$("#UID1663").text("Stop");
}
btn467_clicked = res.UID467;
if ( btn467_clicked ) {
	$("#UID467").text("ON");
	$("#UID467").attr("src", "img/UID467_1.png");
} else {
	$("#UID467").text("OFF");
	$("#UID467").attr("src", "img/UID467_2.png");
}
plot1.series[0].data=res.UID313;
plot1.resetAxesScale();
plot1.replot();
btn678_clicked = res.UID678;
if ( btn678_clicked ) {
	$("#UID678").text("ON");
	$("#UID678").attr("src", "img/UID678_1.png");
} else {
	$("#UID678").text("OFF");
	$("#UID678").attr("src", "img/UID678_2.png");
}

		},
		"json");
};

// Additional functions for controls
$("#UID371").change(function() {
  $.get("SetData?Page=Simple&UID=371&Value=" + $("#UID371").val())
});$("#UID435").click(function() {
  btn435_clicked = !btn435_clicked;
  $.get("SetData?Page=Simple&UID=435&Value=" + btn435_clicked);
});
$("#UID1663").click(function() {
  btn1663_clicked = !btn1663_clicked;
  $.get("SetData?Page=Simple&UID=1663&Value=" + btn1663_clicked);
});
$("#UID467").click(function() {
  btn467_clicked = !btn467_clicked;
  $.get("SetData?Page=Simple&UID=467&Value=" + btn467_clicked);
});


// set data refresh rate
window.setInterval(GetData, 250);

});