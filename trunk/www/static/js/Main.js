$(document).ready(function() {
var interval;

// set up the settings dialog
var dialog = $( "#settingsDlg" );

dialog = $( "#settingsDlg" ).dialog({
  autoOpen: false,
  modal: true,
  buttons: {
    "OK": function() {
      clearInterval(interval);
      interval = window.setInterval(GetData, $( "#refreshRate" ).val());
      dialog.dialog( "close" );
    },
    Cancel: function() {
      dialog.dialog( "close" );
    }
  }
});
$( "#settingsBtn" ).click(function() {
  dialog.dialog( "open" );
});

// variables for created objects
var btn435_clicked = false;
var btn1663_clicked = false;
var btn467_clicked = false;
var plot3649 = $.jqplot("UID3649", [[0],[0]]);


// function to get all data required to populate indicators
function GetData(){
	$.get("GetData?Page=Main", 
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
if (!($("#UID1510:focus").is( ":focus" ))) {
  $("#UID1510").val(res.UID1510);
}
var options = res.UID3649;
if (!jQuery.isEmptyObject(options)) {
  options.axes.xaxis.labelRenderer = $.jqplot.CanvasAxisLabelRenderer;
  options.axes.xaxis.tickRenderer = $.jqplot.CanvasAxisTickRenderer;
  if (!jQuery.isEmptyObject(options.axes.yaxis)) {
    options.axes.yaxis.labelRenderer = $.jqplot.CanvasAxisLabelRenderer;
    options.axes.yaxis.tickRenderer = $.jqplot.CanvasAxisTickRenderer;
  }
  if (!jQuery.isEmptyObject(options.axes.y2axis)) {
    options.axes.y2axis.labelRenderer = $.jqplot.CanvasAxisLabelRenderer;
    options.axes.y2axis.tickRenderer = $.jqplot.CanvasAxisTickRenderer;
  }
  plot3649.replot(options);
}
btn678_clicked = res.UID678;
if ( btn678_clicked ) {
	$("#UID678").text("ON");
	$("#UID678").attr("src", "img/UID678_1.png");
} else {
	$("#UID678").text("OFF");
	$("#UID678").attr("src", "img/UID678_2.png");
}
if (!($("#UID611:focus").is( ":focus" ))) {
  $("#UID611").val(res.UID611);
}

		},
		"json");
};

// Additional functions for controls
$("#UID371").change(function() {
  $.get("SetData?Page=Main&UID=371&Value=" + $("#UID371").val())
});$("#UID435").click(function() {
  btn435_clicked = !btn435_clicked;
  $.get("SetData?Page=Main&UID=435&Value=" + btn435_clicked);
});
$("#UID1663").click(function() {
  btn1663_clicked = !btn1663_clicked;
  $.get("SetData?Page=Main&UID=1663&Value=" + btn1663_clicked);
});
$("#UID467").click(function() {
  btn467_clicked = !btn467_clicked;
  $.get("SetData?Page=Main&UID=467&Value=" + btn467_clicked);
});
$("#UID1510").change(function() {
  $.get("SetData?Page=Main&UID=1510&Value=" + $("#UID1510").val())
});

// set data refresh rate
interval = window.setInterval(GetData, 250);

});