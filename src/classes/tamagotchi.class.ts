import { clear } from 'console';

export default class Tamagotchi {
	birth: Date;
	food: number;
	maxFood: number;
	age: number;
	maxAge: number;
	alive: boolean;
	ageingTimer: ReturnType<typeof setInterval>;

	// Constructor
	constructor(birth: Date, food: number) {
		this.birth = birth;
		this.food = food;
		this.maxFood = 10;
		this.age = 0;
		this.maxAge = 10;
		this.alive = true;

		this.ageingTimer = setInterval(() => {
			this.increaseAge();
		}, 1000);
	}

	// Age
	increaseAge() {
		this.age += 1;
	}

	// Get age
	getAge() {
		return this.age;
	}

	// Feed
	feed() {
		if (this.food >= this.maxFood) {
			return false;
		}
		this.food += 1;
		return true;
	}

	// Get food
	getFood() {
		return this.food;
	}

	// Output status
	outputStatus() {
		console.log(
			`Tamagotchi status -  Age: ${this.getAge()}. Food: ${this.getFood()}. Alive: ${this.isAlive()}`
		);
	}
}
