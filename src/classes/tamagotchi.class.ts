import { clear } from 'console';
import constants from '../constants';

export default class Tamagotchi {
	birth: Date;
	food: number;
	age: number;
	maxAge: number;
	alive: boolean;
	ageingTimer: ReturnType<typeof setInterval>;

	// Constructor
	constructor(birth: Date, food: number) {
		this.birth = birth;
		this.food = food;
		this.age = 0;
		this.maxAge = 5;
		this.alive = true;

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

	// Output status
	outputStatus() {
		console.log(
			`Tamagotchi status -  Age: ${this.getAge()}. Food: ${this.getFood()}. Alive: ${this.isAlive()}`
		);
	}
}
