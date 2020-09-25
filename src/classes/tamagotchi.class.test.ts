import Tamagotchi from './tamagotchi.class';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { maxAge, maxFood, maxEnergy, poopingThreshold, maxPoop, maxTimeSpentDiseased } = require('../constants');

describe('Tamagotchi', () => {
	let tamagotchi: Tamagotchi;
	const startingFood = maxFood - 1;

	beforeEach(() => {
		tamagotchi = new Tamagotchi(startingFood);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('Feeding', () => {
		test("Pet's food level is retrieved successfully", () => {
			expect(tamagotchi.getFood()).toBe(startingFood);
		});

		test("Pet's food level goes up when fed", () => {
			tamagotchi.feed();
			expect(tamagotchi.getFood()).toBe(startingFood + 1);
		});

		test('Pet can be fed when not full', () => {
			expect(tamagotchi.feed()).toMatch('Your tamagotchi was fed');
		});

		test('Pet cannot be fed when full', () => {
			tamagotchi.feed();
			expect(tamagotchi.feed()).toMatch('Your tamagotchi is full');
		});

		test("Pet's food level goes down over time", () => {
			tamagotchi.increaseAge();
			expect(tamagotchi.getFood()).toBe(startingFood - 1);
		});

		test('Pet dies upon running out of food', () => {
			// Initialise a new pet, with minimum food
			tamagotchi = new Tamagotchi(1);

			// Spy on the death function
			const spy = jest.spyOn(tamagotchi, 'die');

			// Age the pet (reduces the food)
			tamagotchi.increaseAge();

			// Check that the pet has run out of food
			expect(tamagotchi.getFood()).toBe(0);

			// Check that the die function was called appropriately
			expect(spy).toHaveBeenCalledWith('lack of food');

			// Check that the pet has died
			expect(tamagotchi.isAlive()).toBe(false);
		});
	});

	describe('Ageing', () => {
		test("Pet's age is retrieved successfully", () => {
			expect(tamagotchi.getAge()).toBe(0);
		});

		test("Pet's age goes up over time", () => {
			tamagotchi.increaseAge();
			expect(tamagotchi.getAge()).toBe(1);
		});

		test('Pet dies upon exceeding the max age', () => {
			// Spy on the death function
			const spy = jest.spyOn(tamagotchi, 'die');

			// Age the pet to the maximum age
			for (let i = 0; i < maxAge; i += 1) {
				tamagotchi.increaseAge();

				// Feed, clean and heal the pet to ensure it doesn't die for other reasons
				tamagotchi.feed();
				tamagotchi.clean();
				tamagotchi.heal();
			}

			// Check that the pet has reached maximum age
			expect(tamagotchi.getAge()).toBe(maxAge);

			// Check that the die function was called appropriately
			expect(spy).toHaveBeenCalledWith('old age');

			// Check that the pet has died
			expect(tamagotchi.isAlive()).toBe(false);
		});
	});

	describe('Sleeping', () => {
		test('Pet can be put to sleep', () => {
			tamagotchi.putToSleep();
			expect(tamagotchi.isSleeping()).toBe(true);
		});

		test('Pet cannot be put to sleep when already asleep', () => {
			tamagotchi.putToSleep();
			expect(tamagotchi.putToSleep()).toMatch('Your tamagotchi is already sleeping');
		});

		test('Pet can be woken up', () => {
			tamagotchi.putToSleep();
			tamagotchi.wakeUp();
			expect(tamagotchi.isSleeping()).toBe(false);
		});

		test("Pet can't be woken up when not asleep", () => {
			expect(tamagotchi.wakeUp()).toMatch('Your tamagotchi is not sleeping');
		});

		test('Pet loses energy whilst awake', () => {
			tamagotchi.increaseAge();
			expect(tamagotchi.getEnergy()).toBe(maxEnergy - 1);
		});

		test('Pet gains energy whilst asleep', () => {
			// Reduce the pet's energy by ageing it
			tamagotchi.increaseAge();
			expect(tamagotchi.getEnergy()).toBe(maxEnergy - 1);

			// Put the pet to sleep and then age it, in order to recover energy
			tamagotchi.putToSleep();
			tamagotchi.increaseAge();

			// Check that the pet's energy has risen back up
			expect(tamagotchi.getEnergy()).toBe(maxEnergy);
		});

		test('Pet does not go above max energy whilst asleep', () => {
			// Reduce the pet's energy by ageing it
			tamagotchi.increaseAge();
			expect(tamagotchi.getEnergy()).toBe(maxEnergy - 1);

			// Put the pet to sleep and then age it, in order to recover energy
			tamagotchi.putToSleep();
			tamagotchi.increaseAge();
			tamagotchi.increaseAge();
			tamagotchi.increaseAge();

			// Check that the pet's energy has risen back up
			expect(tamagotchi.getEnergy()).toBe(maxEnergy);
		});

		test('Pet automatically goes to sleep when out of energy', () => {
			// Use up almost all of the pet's energy
			tamagotchi.energy = 1;

			// Age the pet (uses up the last bit of energy)
			tamagotchi.increaseAge();

			// Check that the pet has fallen asleep
			expect(tamagotchi.isSleeping()).toBe(true);
		});

		test("Pet can't wake without any energy", () => {
			// Use up all of the pet's energy and put it to sleep
			tamagotchi.energy = 0;
			tamagotchi.sleeping = true;

			// Check that the pet is unable to wake up
			expect(tamagotchi.wakeUp()).toMatch("Your pet doesn't have the energy to wake up yet");
		});
	});

	describe('Pooping', () => {
		test("Pet's poop level is retrieved successfully", () => {
			expect(tamagotchi.getPoop()).toBe(0);
		});

		test('Food since last poop increases with food', () => {
			tamagotchi.feed();
			expect(tamagotchi.getFoodSincePoop()).toBe(1);
		});

		test('Pet poops when exceeding the pooping threshold', () => {
			// Initialise a new pet, with minimum food
			tamagotchi = new Tamagotchi(1);

			// Feed the pet enough to make it poop
			for (let i = 0; i < poopingThreshold; i += 1) {
				tamagotchi.feed();
			}

			// Expect the pet to have pooped
			expect(tamagotchi.getPoop()).toBe(1);
		});

		test('Pet dies when not properly cleaned', () => {
			// Initialise a new pet, with minimum food
			tamagotchi = new Tamagotchi(1);

			// Feed the pet enough to make it poop the maximum amount
			for (let i = 0; i < maxPoop * poopingThreshold; i += 1) {
				tamagotchi.feed();
			}

			// Check that the pet has died
			expect(tamagotchi.isAlive()).toBe(false);
		});

		test('Cleaning a pet decreases the amount of poop around it', () => {
			// Initialise a new pet, with minimum food
			tamagotchi = new Tamagotchi(1);

			// Feed the pet enough to make it poop
			for (let i = 0; i < poopingThreshold; i += 1) {
				tamagotchi.feed();
			}

			// Expect the pet to have pooped
			expect(tamagotchi.getPoop()).toBe(1);

			// Clean up the poop
			tamagotchi.clean();

			// Expect the pet to no longer have poop around it
			expect(tamagotchi.getPoop()).toBe(0);
		});

		test("Pet's who have not pooped cannot be cleaned", () => {
			expect(tamagotchi.clean()).toMatch("There isn't any poop to clean up");
		});
	});

	describe('Disease', () => {
		test("Pet's diseased state is retrieved successfully", () => {
			expect(tamagotchi.isDiseased()).toBe(false);
		});

		test('Pet dies when not healed from disease quickly enough', () => {
			// Manually disease the pet
			tamagotchi.diseased = true;

			// Age the pet to the point of death by disease
			for (let i = 0; i < maxTimeSpentDiseased; i += 1) {
			tamagotchi.increaseAge();

				// Feed and clean the pet to ensure it doesn't die for other reasons
				tamagotchi.feed();
				tamagotchi.clean();
			}

			// Expect the pet to have died
			expect(tamagotchi.isDiseased()).toBe(true);
		});
	});
});
