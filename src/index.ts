import { log, clear } from 'console';
import readline from 'readline';
import constants from './constants';
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
	log('Available commands: (f)eed / (p)at / (s)leep / (c)lean. Or enter anything else for a status update.');

	// Ask the user for a command
	readLineInterface.question('Command: ', (command) => {
		// Clear the console
		clear();

		// Check if the Tamagotchi has died
		if (!tamagotchi.isAlive()) {
			// Create a new Tamagotchi
			tamagotchi = new Tamagotchi();
			log('A new Tamagotchi was born!');
		} else {
			// Switch based on the command entered
			switch (command) {
				// Clean the Tamagotchi
				case 'c':
				case 'clean': {
					// Attempt to clean the pet
					log(tamagotchi.clean() ? 'You cleaned 1 poop up' : "There isn't any poop to clean up");
					break;
				}

				// Feed the Tamagotchi
				case 'f':
				case 'feed': {
					// Check if the pet is sleeping
					if (tamagotchi.isSleeping()) {
						log("You can't feed a sleeping pet, wake it up first");
					} else {
						// Attempt to feed the pet
						log(tamagotchi.feed() ? 'Your tamagotchi was fed' : 'Your tamagotchi is full');
					}
					break;
				}

				// Heal the Tamagotchi
				case 'h':
				case 'heal': {
					// Check if the pet has a disease
					if (!tamagotchi.isDiseased()) {
						log("Your pet doesn't have a disease that needs healing");
					} else {
						// Attempt to heal the pet
						log(tamagotchi.heal() ? 'Your tamagotchi was healed of disease' : 'Your tamagotchi was not healed, try again');
					}
					break;
				}

				// Put the Tamagotchi to sleep
				case 's':
				case 'sleep': {
					// Check if the pet is sleeping
					if (!tamagotchi.isSleeping()) {
						// Put the pet to sleep
						tamagotchi.setSleeping(true);
						log('Your tamagotchi was put to sleep');
					} else {
						log('Your tamagotchi is already sleeping');
					}
					break;
				}

				// Wake the Tamagotchi up
				case 'w':
				case 'wakeup': {
					// Check if the pet is sleeping
					if (tamagotchi.isSleeping()) {
						// Check if the pet has enough energy to wake up
						if (tamagotchi.getEnergy() >= constants.minimumWakeupEnergy) {
							// Wake the pet up
							tamagotchi.setSleeping(false);
							log('Your tamagotchi was woken up');
						} else {
							log(`Your tamagotchi doesn't have the energy to wake up yet (${constants.minimumWakeupEnergy} minimum)`);
						}
					} else {
						log('Your tamagotchi is not sleeping');
					}
					break;
				}

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
tamagotchi = new Tamagotchi();
clear();
log('A new Tamagotchi was born!');

// Begin the recursive questioning
recursiveReadLine();
