import { clear } from 'console';
import constants from '../constants';

export default class Tamagotchi {
	birth: Date;
	food?: number;
	age: number;
	maxAge: number;
	alive: boolean;
	sleeping: boolean;
	energy: number;
	ageingTimer: ReturnType<typeof setInterval>;

	// Constructor
	constructor(birth: Date, food: number = constants.maxFood) {
		this.birth = birth;
		this.food = food;
		this.age = 0;
		this.maxAge = constants.maxAge;
		this.alive = true;
		this.sleeping = false;
		this.energy = constants.maxEnergy;

		this.ageingTimer = setInterval(() => {
			this.increaseAge();
		}, 1000);
	}

	// Age
	increaseAge() {
		this.age += 1;
		this.food -= 1;

		// If the pet has run out of food
		if (this.food <= 0) {
			this.die();
		}
		// If the pet has become too old
		else if (this.age > this.maxAge) {
			this.die();
		}

		// Check if the pet is asleep
		if (this.isSleeping()) {
			// If so, increase its energy level
			this.energy += 1;
		}
		// Otherwise, decrease its energy level
		else {
			this.energy -= 1;

			// Check if the pet needs to sleep
			if (this.energy <= 0) {
				this.setSleeping(true);
			}
		}
	}

	// Die
	die() {
		this.alive = false;

		// Kill the timer
		clearInterval(this.ageingTimer);

		// Notify the user
		clear();
		console.log(
			'Your Tamagotchi has passed away. Press enter to start over.'
		);
	}

	// Get age
	getAge() {
		return this.age;
	}

	// Feed
	feed() {
		if (this.food >= constants.maxFood) {
			return false;
		}
		this.food += 1;
		return true;
	}

	// Get food
	getFood() {
		return this.food;
	}

	// Is alive
	isAlive() {
		return this.alive;
	}

	// Is sleeping
	isSleeping() {
		return this.sleeping;
	}

	// Get energy
	getEnergy() {
		return this.energy;
	}

	// Put to sleep
	setSleeping(newState: boolean) {
		this.sleeping = newState;
	}

	// Output status
	outputStatus() {
		console.log(
			`Tamagotchi status -  Age: ${this.getAge()}. Food: ${this.getFood()}. Alive: ${this.isAlive()}. Energy: ${this.getEnergy()} (${
				this.isSleeping() ? 'sleeping' : 'awake'
			})`
		);
	}
}
