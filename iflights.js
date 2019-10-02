var readlineSync = require('readline-sync');
var five = require("johnny-five");

var board = new five.Board({repl:false});

board.on("ready", function() {

    var redleft = new five.Led(13);
    var redright = new five.Led(5);
    var green = new five.Led(9);
    
  var ledColour = readlineSync.question('Which colour? ');

  if(ledColour === "red"){
    redleft.on();
    redright.on();
  }
  else if(ledColour == "green"){
    green.on();
  }
  else{
      console.log(ledColour+"  is not a colour I know")
  }

});