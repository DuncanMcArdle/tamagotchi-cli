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
	poop: number;
	foodSincePoop: number;

	// Constructor
	constructor(birth: Date, food: number = constants.maxFood) {
		this.birth = birth;
		this.food = food;
		this.age = 0;
		this.maxAge = constants.maxAge;
		this.alive = true;
		this.sleeping = false;
		this.energy = constants.maxEnergy;
		this.poop = 0;
		this.foodSincePoop = 0;

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
			this.die('lack of food');
		}
		// If the pet has become too old
		else if (this.age > this.maxAge) {
			this.die('old age');
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
	die(causeOfDeath: string) {
		this.alive = false;

		// Kill the timer
		clearInterval(this.ageingTimer);

		// Notify the user
		clear();
		console.log(
			`Your Tamagotchi died due to ${causeOfDeath}. Press enter to start over.`
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
		this.increaseFoodSincePoop();
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

	// Poop
	doPoop() {
		this.poop += 1;
		this.foodSincePoop = 0;

		// Check if the pet has exceeded the maximum amount of poop
		if (this.poop >= constants.maxPoop) {
			this.die('poor hygeine');
		}
	}

	// Get poop amount
	getPoop() {
		return this.poop;
	}

	// Get food consumed since last poop
	getFoodSincePoop() {
		return this.foodSincePoop;
	}

	// Increase the amount of poop in the pet
	increaseFoodSincePoop() {
		this.foodSincePoop += 1;
		if (this.foodSincePoop >= constants.poopingThreshold) {
			this.doPoop();
		}
	}

	// Clean the pet
	clean() {
		if (this.poop <= 0) {
			return false;
		}
		this.poop -= 1;
		return true;
	}

	// Output status
	outputStatus() {
		console.log(
			`Tamagotchi status -  Age: ${this.getAge()}. Food: ${this.getFood()}. Alive: ${this.isAlive()}. Energy: ${this.getEnergy()} (${
				this.isSleeping() ? 'sleeping' : 'awake'
			}). Poop: ${this.getPoop()}. Food since last poop: ${this.getFoodSincePoop()}`
		);
	}
}
