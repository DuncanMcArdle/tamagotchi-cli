import { clear, log } from 'console';
import constants from '../constants';

export default class Tamagotchi {
	food: number;
	age: number;
	maxAge: number;
	alive: boolean;
	sleeping: boolean;
	energy: number;
	ageingTimer: ReturnType<typeof setInterval>;
	poop: number;
	foodSincePoop: number;
	diseased: boolean;
	timeSpentDiseased: number;

	/**
	 * Create a pet
	 * @param {number} food The starting food of the pet (optional)
	 */
	constructor(food: number = constants.maxFood) {
		this.food = food;
		this.age = 0;
		this.maxAge = constants.maxAge;
		this.alive = true;
		this.sleeping = false;
		this.energy = constants.maxEnergy;
		this.poop = 0;
		this.foodSincePoop = 0;
		this.diseased = false;
		this.timeSpentDiseased = 0;

		// Start ageing the pet
		this.ageingTimer = setInterval(() => {
			this.increaseAge();
		}, 1000);
	}

	/**
	 * Retrieves the pets current age
	 *
	 * @returns {number} The pet's age
	 */
	getAge(): number {
		return this.age;
	}

	/**
	 * Increases the pets current age
	 */
	increaseAge() {
		this.age += 1;

		// If the pet has become too old
		if (this.age > this.maxAge) {
			this.die('old age');
		} else {
			// Reduce the pet's food level
			this.food -= 1;

			// If the pet has run out of food
			if (this.food <= 0) {
				this.die('lack of food');
			}
			// If the pet has spent too long with a disease
			else if (this.isDiseased() && this.timeSpentDiseased + 1 >= constants.maxTimeSpentDiseased) {
				this.die('disease');
			}
			// If the pet is still alive
			else {
				// Check if the pet is asleep
				if (this.isSleeping()) {
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

				// Check if the pet is currently diseased
				if (this.isDiseased()) {
					this.timeSpentDiseased += 1;
				}
				// Randomly decide whether or not to give the pet a disease
				else if (Math.random() * 99 + 1 <= constants.riskOfDisease) {
					this.diseased = true;
				}
			}
		}
	}

	/**
	 * Kills the pet, outputting the cause of death to the console
	 */
	die(causeOfDeath: string) {
		this.alive = false;

		// Kill the timer
		clearInterval(this.ageingTimer);

		// Notify the user
		clear();
		log(`Your Tamagotchi died due to ${causeOfDeath}. Press enter to start over.`);
	}

	/**
	 * Retrieves the pet's current food level
	 *
	 * @returns {number} The pet's current food level
	 */
	getFood(): number {
		return this.food;
	}

	/**
	 * Attempts to feed the pet
	 */
	feed() {
		if (this.food >= constants.maxFood) {
			return false;
		}
		this.increaseFoodSincePoop();
		this.food += 1;
		return true;
	}

	/**
	 * Retrieves whether or not the pet is alive
	 *
	 * @returns {boolean} Whether or not the pet is currently alive
	 */
	isAlive(): boolean {
		return this.alive;
	}

	/**
	 * Retrieves whether or not the pet is sleeping
	 *
	 * @returns {boolean} Whether or not the pet is currently sleeping
	 */
	isSleeping(): boolean {
		return this.sleeping;
	}

	/**
	 * Retrieves the pet's current energy level
	 *
	 * @returns {number} The pet's current energy level
	 */
	getEnergy(): number {
		return this.energy;
	}

	/**
	 * Puts the pet to sleep
	 */
	setSleeping(newState: boolean) {
		this.sleeping = newState;
	}

	/**
	 * Attempts to make the pet poop
	 */
	doPoop() {
		this.poop += 1;
		this.foodSincePoop = 0;

		// Check if the pet has exceeded the maximum amount of poop
		if (this.poop >= constants.maxPoop) {
			this.die('poor hygeine');
		}
	}

	/**
	 * Retrieves the pet's current amount of poop
	 *
	 * @returns {number} The pet's current amount of poop
	 */
	getPoop(): number {
		return this.poop;
	}

	/**
	 * Retrieves the amount of food the pet has digested since its last poop
	 *
	 * @returns {number} The amount of food the pet has digested since its last poop
	 */
	getFoodSincePoop(): number {
		return this.foodSincePoop;
	}

	/**
	 * Increases the amount of food the pet has digested since its last poop
	 */
	increaseFoodSincePoop() {
		this.foodSincePoop += 1;
		if (this.foodSincePoop >= constants.poopingThreshold) {
			this.doPoop();
		}
	}

	/**
	 * Attempts to clean the poop around the pet
	 */
	clean() {
		if (this.poop <= 0) {
			return false;
		}
		this.poop -= 1;
		return true;
	}

	/**
	 * Attempts to heal the pet
	 */
	heal() {
		if (!this.isDiseased()) {
			return false;
		}

		// Attempt to heal the pet
		if (Math.random() * 99 + 1 <= constants.chanceOfHealing) {
			this.diseased = false;
			this.timeSpentDiseased = 0;
			return true;
		}
		return false;
	}

	/**
	 * Retrieves whether or not the pet is diseased
	 *
	 * @returns {boolean} Whether or not the pet is currently diseased
	 */
	isDiseased(): boolean {
		return this.diseased;
	}

	/**
	 * Outputs a series of stats around the pet into the console
	 */
	outputStatus() {
		log(
			`Tamagotchi status -  Age: ${this.getAge()}. Food: ${this.getFood()}. Alive: ${this.isAlive()}. Energy: ${this.getEnergy()} (${
				this.isSleeping() ? 'sleeping' : 'awake'
			}). Poop: ${this.getPoop()}. Food since last poop: ${this.getFoodSincePoop()}`
		);

		// Check if the pet is diseased
		if (this.isDiseased()) {
			log(
				`WARNING: Your pet has a disease! It will die in ${
					constants.maxTimeSpentDiseased - this.timeSpentDiseased
				} seconds if you do not (h)eal it`
			);
		}
	}
}
