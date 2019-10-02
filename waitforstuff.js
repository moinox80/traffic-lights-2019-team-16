var five = require("johnny-five");
var wait = require("wait-for-stuff");

var board = new five.Board();

board.on("ready", function() {

  var led = new five.Led(13);
 
  led.on();
  wait.for.time(3);
  led.off();

});