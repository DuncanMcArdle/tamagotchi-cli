import { log, clear } from 'console';
import { Key } from 'readline';
import chalk from 'chalk';
import Tamagotchi from './tamagotchi.class';
import highlight from '../utils/highlight';
import constants from '../constants';

export default class Game {
	tamagotchi: Tamagotchi;
	timer: ReturnType<typeof setInterval>;
	lastMessage: string;

	/**
	 * Create a Game
	 */
	constructor() {
		this.tamagotchi = null;
		this.lastMessage = '';

		// Create a tamagotchi
		this.createTamagotchi();
	}

	/**
	 * Advance the game by a tick
	 */
	gameTick() {
		// Age the pet
		this.tamagotchi.increaseAge();

		// Check if it has died
		if (!this.tamagotchi.isAlive()) {
			// If not, cancel the ageing timer
			clearInterval(this.timer);

			// Set the latest output
			this.lastMessage = `Your pet died due to ${this.tamagotchi.causeOfDeath}. Press any key to start over.`;
		}

		// Update the console
		this.updateConsole();
	}

	/**
	 * Create a Tamagotchi
	 */
	createTamagotchi() {
		// Create a Tamagotchi
		this.tamagotchi = new Tamagotchi();
		this.lastMessage = 'A new Tamagotchi was born!';

		// Start the ageing process
		this.timer = setInterval(() => {
			this.gameTick();
		}, constants.tickRate);

		// Show the status of the pet
		this.updateConsole();
	}

	/**
	 * Outputs a series of stats around the pet into the console
	 */
	updateConsole() {
		// Format individual stats
		const highlightedAge = highlight(this.tamagotchi.getAge(), constants.maxAge, true);
		const highlightedFood = highlight(this.tamagotchi.getFood(), constants.maxFood, false);
		const highlightedEnergy = highlight(this.tamagotchi.getEnergy(), constants.maxEnergy, false);
		const sleepingStatus = this.tamagotchi.isSleeping() ? 'sleeping' : 'awake';
		const highlightedPoop = highlight(this.tamagotchi.getPoop(), constants.maxPoop, true);

		clear();
		log(this.lastMessage);
		log('---');
		log(
			`Tamagotchi status - ` +
				`Age: ${highlightedAge}. ` +
				`Food: ${highlightedFood}. ` +
				`Energy: ${highlightedEnergy} (${sleepingStatus}). ` +
				`Poop: ${highlightedPoop}. ` +
				`Food since last poop: ${this.tamagotchi.getFoodSincePoop()}`
		);
		log('---');

		// Explain the available commands to the user
		log('Available commands: (f)eed / (s)leep / (c)lean / e(x)it. Or enter anything else for a status update.');

		// Check if the pet is diseased
		if (this.tamagotchi.isDiseased()) {
			log(
				chalk.red(
					`WARNING: Your pet has a disease! It will die in ${
						constants.maxTimeSpentDiseased - this.tamagotchi.timeSpentDiseased
					} seconds if you do not (h)eal it`
				)
			);
		}
	}

	/**
	 * Process a key being pressed
	 * @param key {Key} The key(s) being pressed
	 */
	processKeyPress(key: Key) {
		// User is trying to exit the game
		if ((key.ctrl && key.name === 'c') || key.name === 'x') {
			process.exit();
		} else {
			// Clear the previous output
			clear();

			// Check if the pet has died
			if (!this.tamagotchi.isAlive()) {
				// Create a new Tamagotchi
				this.createTamagotchi();
			}
			// Pet is alive
			else {
				// Switch based on the command entered
				switch (key.name) {
					// Clean the Tamagotchi
					case 'c': {
						// Attempt to clean the pet
						this.lastMessage = this.tamagotchi.clean();
						break;
					}

					// Feed the Tamagotchi
					case 'f': {
						// Attempt to feed the pet
						this.lastMessage = this.tamagotchi.feed();
						break;
					}

					// Heal the Tamagotchi
					case 'h': {
						// Attempt to heal the pet
						this.lastMessage = this.tamagotchi.heal();
						break;
					}

					// Put the Tamagotchi to sleep
					case 's': {
						// Attempt to put the pet to sleep
						this.lastMessage = this.tamagotchi.putToSleep();
						break;
					}

					// Wake the pet up
					case 'w': {
						// Attempt to wake the pet up
						this.lastMessage = this.tamagotchi.wakeUp();
						break;
					}

					// Unknown command / Status update
					default: {
						this.lastMessage = 'Command not recognised, try again.';
						break;
					}
				}
			}

			// Show the status of the pet
			this.updateConsole();
		}
	}
}
