import constants from '../constants';

export default class Tamagotchi {
	food: number;
	age: number;
	maxAge: number;
	alive: boolean;
	sleeping: boolean;
	energy: number;
	poop: number;
	foodSincePoop: number;
	diseased: boolean;
	timeSpentDiseased: number;
	causeOfDeath: string;

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
		this.causeOfDeath = '';
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
		if (this.age >= this.maxAge) {
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
						this.sleeping = true;
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
	 * Kills the pet, storing the cause of death
	 */
	die(causeOfDeath: string) {
		this.alive = false;
		this.causeOfDeath = causeOfDeath;
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
	 *
	 * @returns {string} The message to output to the user
	 */
	feed() {
		// Check if the pet is sleeping
		if (this.isSleeping()) {
			return "You can't feed a sleeping pet, wake it up first";
		}
		if (this.food >= constants.maxFood) {
			return 'Your tamagotchi is full';
		}

		// Feed the pet
		this.increaseFoodSincePoop();
		this.food += 1;
		return 'Your tamagotchi was fed';
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
	 *
	 * @returns {string} The message to output to the user
	 */
	putToSleep(): string {
		// Check if the pet is sleeping
		if (!this.isSleeping()) {
			// Put the pet to sleep
			this.sleeping = true;
			return 'Your tamagotchi was put to sleep';
		}
		return 'Your tamagotchi is already sleeping';
	}

	/**
	 * Wakes the pet up
	 *
	 * @returns {string} The message to output to the user
	 */
	wakeUp(): string {
		// Check if the pet is sleeping
		if (!this.isSleeping()) {
			return 'Your tamagotchi is not sleeping';
		}
		// Check if the pet is capable of waking up
		if (this.energy < constants.minimumWakeupEnergy) {
			return "Your pet doesn't have the energy to wake up yet";
		}
		// Wake the pet up
		this.sleeping = false;
		return 'Your tamagotchi was woken up';
	}

	/**
	 * Attempts to make the pet poop
	 */
	doPoop() {
		this.poop += 1;
		this.foodSincePoop = 0;

		// Check if the pet has exceeded the maximum amount of poop
		if (this.poop >= constants.maxPoop) {
			this.die('poor hygiene');
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
	 *
	 * @returns {string} The message to output to the user
	 */
	clean() {
		// Check if there is any poop to clear up
		if (this.poop <= 0) {
			return "There isn't any poop to clean up";
		}

		// Clear the poop up
		this.poop -= 1;
		return 'You cleaned 1 poop up';
	}

	/**
	 * Attempts to heal the pet
	 *
	 * @returns {string} The message to output to the user
	 */
	heal() {
		// Check if the pet has a disease
		if (!this.isDiseased()) {
			return "Your pet doesn't have a disease that needs healing";
		}
		// Attempt to heal the pet
		if (Math.random() * 99 + 1 <= constants.chanceOfHealing) {
			this.diseased = false;
			this.timeSpentDiseased = 0;
			return 'Your tamagotchi was healed of disease';
		}
		return 'Your tamagotchi was not healed, try again';
	}

	/**
	 * Retrieves whether or not the pet is diseased
	 *
	 * @returns {boolean} Whether or not the pet is currently diseased
	 */
	isDiseased(): boolean {
		return this.diseased;
	}
}
