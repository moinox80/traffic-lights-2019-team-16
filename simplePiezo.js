var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  // Create a standard `piezo` instance on pin 3
  var myPiezo = new five.Piezo(3);

  myPiezo.frequency(587, 1000); // Play note d5 for 1 second
});
