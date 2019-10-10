// Group 16 — David, Ander, Antonia, Euan
const {Board, Leds, Button} = require('johnny-five');
const wait = require('wait-for-stuff');

const board = new Board({port: 'COM6'});

// Global flag for pedestrian cycles.
var pedButtonClicked = false;

function turnRed(lights){
    // Turn green off.
    lights[2].off();

    // Amber comes on for two seconds.
    lights[1].on();
    wait.for.time(2);

    // Amber off, red on.
    lights[1].off();
    lights[0].on();
}

function turnGreen(lights){
    // Amber and red for two seconds.
    lights[1].on();
    wait.for.time(2);

    // Turn both amber and red off.
    lights[0].off();
    lights[1].off();

    // Turn green on.
    lights[2].on();
}

function regularCycle(lights){
    console.log('Regular cycle is running.');

    turnGreen(lights);
    wait.for.time(5);
    turnRed(lights);
    wait.for.time(5);

	// Check if the global pedButtonClicked flag is true.
	// Essentially, run the pedestrian cycle after the regular
	// cycle, then reset.
    if(pedButtonClicked){
        pedestrianCycle(lights);
        pedButtonClicked = false;
    }
}

function pedestrianCycle(lights){
    console.log('Pedestrian cycle is running.');

    // Red and pedestrian lights on, others off.
    lights[0].on();
    lights[3].on();

    lights[1].off();
    lights[2].off();

    wait.for.time(8);
    lights[3].off();
}

board.on('ready', () => {
	// Store the LEDs in array.
	// 0. Red   --> pin 3
	// 1. Amber --> pin 5
	// 2. Green --> pin 6
	// 3. Blue  --> pin 9 (pedestrian walk light)
	
    const lights = Leds([3,5,6,9]);
	
	// The button set up without a resistor.
    const pedButton = new Button({
        pin: 2,
        isPullup: true
    });

	// Red should be on initially.
    lights[0].on();
	
	// Some boot up time.
	wait.for.time(2);
    
    do {
        pedButton.on('press', () => {
            console.log('Pedestrian button clicked, waiting for regular cycle to finish.');
            pedButtonClicked = true;
        });
        regularCycle(lights);
    } while(1);
});