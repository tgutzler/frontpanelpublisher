var wsUri = "ws://localhost:8181/";
var socket;

$(document).ready(function() {
  socket = new WebSocket(wsUri);

  socket.onopen = function (event) {
    socket.send("Page=Example2");
    socket.binaryType = "arraybuffer"; 
    // set data refresh rate
    clearInterval(interval);
    interval = window.setInterval(GetData, 250);
    socket.send("GetAllData?Page=Example2");
  }

  socket.onclose = function (event) {
    //clearInterval(interval);
    //interval = window.setInterval(Reconnect, 1000);
  }

  // Handle error by reconnecting
  socket.onerror = function(error) {
    //socket.close();
    //clearInterval(interval);
    //interval = window.setInterval(Reconnect, 1000);
  }

// Request new data for this page
function GetData() {
	if (socket.readyState = 1) {
		socket.send("GetData?Page=Example2");
	}
};

// Reconnect
function Reconnect() {
  socket = new WebSocket(wsUri);
}

// webservice stuff
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
var btn445_clicked = false;
var plot193 = $.jqplot("UID193", [[0],[0]]);


// Incoming Event Handler
socket.onmessage = function(msg) {
  res = JSON.parse(msg.data);
// object specific code to manipulate variables defined above

if(res.UID445){
btn445_clicked = res.UID445.val;
if(res.UID445.hasOwnProperty('width')){
	if(res.UID445.width==0)
{$("#UID445").css({"display" : "none"});}
	else
	{$("#UID445").css({"left" : res.UID445.left, "top" : res.UID445.top, "height" : res.UID445.height, "width" : res.UID445.width, "display" : "initial"});}}

if ( btn445_clicked ) {
	$("#UID445").text("Stop");
} else {
	$("#UID445").text("Stop");
}
if(res.UID445.width==0)
	{$("#UID445").text("");}
}

if(res.UID193){
var options = res.UID193.val;
if(res.UID193.hasOwnProperty('width')){
	if(res.UID193.width==0)
	{$("#UID193").css({"display" : "none"});}
	else
	{$("#UID193").css({"left" : res.UID193.left, "top" : res.UID193.top, "height" : res.UID193.height, "width" : res.UID193.width, "display" : "initial"});}}

if (!jQuery.isEmptyObject(options)) {
	if (options.axes)
	{
	if (options.axes.xaxis) {
		options.axes.xaxis.labelRenderer = $.jqplot.CanvasAxisLabelRenderer;
		options.axes.xaxis.tickRenderer = $.jqplot.CanvasAxisTickRenderer;
	}
	if (options.axes.yaxis) {
		options.axes.yaxis.labelRenderer = $.jqplot.CanvasAxisLabelRenderer;
		options.axes.yaxis.tickRenderer = $.jqplot.CanvasAxisTickRenderer;
	}
	if (options.axes.y2axis) {
		options.axes.y2axis.labelRenderer = $.jqplot.CanvasAxisLabelRenderer;
		options.axes.y2axis.tickRenderer = $.jqplot.CanvasAxisTickRenderer;
	}
	}
	plot193.replot(options);
}}

}

// Additional functions for controls

$("#UID445").click(function() {
  btn445_clicked = !btn445_clicked;
  socket.send("SetData?UID=445&Value=" + btn445_clicked);
});

});

$(window).bind('beforeunload', function() {
  socket.send("close");
  socket.close();
});