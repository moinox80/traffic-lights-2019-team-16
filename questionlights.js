
var readlineSync = require('readline-sync');
var five = require("johnny-five");

var board = new five.Board();

board.on("ready", function() {

  var pinNumber = readlineSync.question('Which Light? ');
  var led = new five.Led(pinNumber);
 
  led.on();

});