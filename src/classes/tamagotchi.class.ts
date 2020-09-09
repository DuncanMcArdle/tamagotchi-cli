import { clear } from 'console';

export default class Tamagotchi {
	birth: Date;
	food: number;
	maxFood: number;
	age: number;
	maxAge: number;
	alive: boolean;

	// Constructor
	constructor(birth: Date, food: number) {
		this.birth = birth;
		this.food = food;
		this.maxFood = 10;
		this.age = 0;
		this.maxAge = 10;
		this.alive = true;
	}

	// Output status
	outputStatus() {
		console.log(
			`Tamagotchi status -  Age: ${this.getAge()}. Food: ${this.getFood()}. Alive: ${this.isAlive()}`
		);
	}
}
