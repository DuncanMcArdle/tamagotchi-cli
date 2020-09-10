import Tamagotchi from './tamagotchi.class';

const {
	maxAge,
	maxFood,
	maxEnergy,
	poopingThreshold,
	maxPoop,
	maxTimeSpentDiseased,
	riskOfDisease,
	chanceOfHealing,
} = require('../constants');

describe('Tamagotchi', () => {
	let tamagotchi;
	const startingFood = maxFood - 1;

	beforeEach(() => {
		tamagotchi = new Tamagotchi(startingFood);
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
			expect(tamagotchi.feed()).toBe(true);
		});

		test('Pet cannot be fed when full', () => {
			tamagotchi.feed();
			expect(tamagotchi.feed()).toBe(false);
		});

		test("Pet's food level goes down over time", () => {
			tamagotchi.increaseAge();
			expect(tamagotchi.getFood()).toBe(startingFood - 1);
		});

		test('Pet dies upon running out of food', () => {
			// Initialise a new pet, with minimum food
			tamagotchi = new Tamagotchi(1);

			// Age the pet
			tamagotchi.increaseAge();

			// Check that the pet has run out of food
			expect(tamagotchi.getFood()).toBe(0);

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
			// Age the pet to the maximum age
			for (let i = 0; i < maxAge; i += 1) {
				tamagotchi.increaseAge();
			}

			// Check that the pet has reached maximum age
			expect(tamagotchi.getAge()).toBe(maxAge);

			// Check that the pet has died
			expect(tamagotchi.isAlive()).toBe(false);
		});
	});

	describe('Sleeping', () => {
		test('Pet can be put to sleep', () => {
			tamagotchi.setSleeping(true);
			expect(tamagotchi.isSleeping()).toBe(true);
		});

		test('Pet can be woken up', () => {
			tamagotchi.setSleeping(true);
			tamagotchi.setSleeping(false);
			expect(tamagotchi.isSleeping()).toBe(false);
		});

		test('Pet loses energy whilst awake', () => {
			tamagotchi.increaseAge();
			expect(tamagotchi.getEnergy()).toBe(maxEnergy - 1);
		});

		test('Pet gains energy whilst asleep', () => {
			tamagotchi.increaseAge();
			expect(tamagotchi.getEnergy()).toBe(maxEnergy - 1);
			tamagotchi.setSleeping(true);
			tamagotchi.increaseAge();
			expect(tamagotchi.getEnergy()).toBe(maxEnergy);
		});

		test('Pet goes to sleep when out of energy', () => {
			// Use up all of the pet's energy
			for (let i = 0; i < maxEnergy; i += 1) {
				tamagotchi.increaseAge();

				// Feed, clean and heal the pet to ensure it doesn't die
				tamagotchi.feed();
				tamagotchi.clean();
				tamagotchi.heal();
			}

			// Check that the pet has fallen asleep
			expect(tamagotchi.isSleeping()).toBe(true);
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
			expect(tamagotchi.clean()).toBe(false);
		});
	});

	describe('Disease', () => {
		test("Pet's diseased state is retrieved successfully", () => {
			expect(tamagotchi.isDiseased()).toBe(false);
		});

		test.skip('Pet becomes diseased when odds indicate it', () => {
			jest.resetModules();

			// Set the odds of becoming diseased to 100%
			// TODO

			// Age the pet
			tamagotchi.increaseAge();

			// Expect the pet to have become diseased
			expect(tamagotchi.isDiseased()).toBe(true);
		});

		test.skip('Pet can be healed when diseased', () => {
			// Manually disease the pet
			tamagotchi.diseased = true;

			// Set the odds of healing disease to 100%
			// TODO

			// Attempt to heal the pet
			tamagotchi.heal();

			// Expect the pet to have been healed
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
