import { log, clear } from 'console';
import readline from 'readline';
import Tamagotchi from './classes/tamagotchi.class';

// Initialise miscellaneous variables
let tamagotchi = null;

// Interface for using readLine
const readLineInterface = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Read line in recursively
const recursiveReadLine = () => {
	// Output the Tamagotchi's status
	log('---');
	tamagotchi.outputStatus();

	// Explain the available commands to the user
	log(
		'Available commands: (f)eed / (p)at / (s)leep / (c)lean. Or enter anything else for a status update.'
	);

	// Ask the user for a command
	readLineInterface.question('Command: ', (command) => {
		// Clear the console
		clear();

		// Check if the Tamagotchi has died
		if (!tamagotchi.isAlive()) {
			// Create a new Tamagotchi
			tamagotchi = new Tamagotchi(new Date(), 10);
			log('A new Tamagotchi was born!');
		} else {
			// Switch based on the command entered
			switch (command) {
				// Unknown command / Status update
				default: {
					log('Command not recognised, try again.');
					break;
				}
			}
		}

		// Call the function again
		recursiveReadLine();
	});
};

// Create a Tamagotchi
tamagotchi = new Tamagotchi(new Date(), 10);
clear();
log('A new Tamagotchi was born!');

// Begin the recursive questioning
recursiveReadLine();
