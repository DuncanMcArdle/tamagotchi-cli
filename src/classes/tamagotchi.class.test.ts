import Tamagotchi from './tamagotchi.class';
import constants from '../constants';

describe('Tamagotchi', () => {
	let tamagotchi: Tamagotchi;
	const startingFood = constants.maxFood - 1;

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

		test('Pet cannot be fed when asleep', () => {
			tamagotchi.putToSleep();
			expect(tamagotchi.feed()).toMatch("You can't feed a sleeping pet, wake it up first");
		});

		test("Pet's food goes down when reduced", () => {
			tamagotchi.reduceFood();
			expect(tamagotchi.getFood()).toBe(startingFood - 1);
		});

		test('Pet dies upon running out of food', () => {
			// Initialise a new pet, with minimum food
			tamagotchi = new Tamagotchi(1);

			// Spy on the death function
			const spy = jest.spyOn(tamagotchi, 'die');

			// Rreduce the pet's food
			tamagotchi.reduceFood();

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
			for (let i = 0; i < constants.maxAge; i += 1) {
				tamagotchi.increaseAge();

				// Heal the pet to ensure it doesn't die
				tamagotchi.heal();
			}

			// Check that the pet has reached maximum age
			expect(tamagotchi.getAge()).toBe(constants.maxAge);

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
			tamagotchi.increaseDecreaseEnergy();
			expect(tamagotchi.getEnergy()).toBe(constants.maxEnergy - 1);
		});

		test('Pet gains energy whilst asleep', () => {
			// Reduce the pet's energy
			tamagotchi.increaseDecreaseEnergy();
			expect(tamagotchi.getEnergy()).toBe(constants.maxEnergy - 1);

			// Put the pet to sleep
			tamagotchi.putToSleep();
			tamagotchi.increaseDecreaseEnergy();

			// Check that the pet's energy has risen back up
			expect(tamagotchi.getEnergy()).toBe(constants.maxEnergy);
		});

		test('Pet does not go above max energy whilst asleep', () => {
			// Reduce the pet's energy by ageing it
			tamagotchi.increaseDecreaseEnergy();
			expect(tamagotchi.getEnergy()).toBe(constants.maxEnergy - 1);

			// Put the pet to recovery energy
			tamagotchi.putToSleep();
			tamagotchi.increaseDecreaseEnergy();
			tamagotchi.increaseDecreaseEnergy();
			tamagotchi.increaseDecreaseEnergy();

			// Check that the pet's energy has risen back up
			expect(tamagotchi.getEnergy()).toBe(constants.maxEnergy);
		});

		test('Pet automatically goes to sleep when out of energy', () => {
			// Use up almost all of the pet's energy
			tamagotchi.energy = 1;

			// Age the pet (uses up the last bit of energy)
			tamagotchi.increaseDecreaseEnergy();

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
			for (let i = 0; i < constants.poopingThreshold; i += 1) {
				tamagotchi.feed();
			}

			// Expect the pet to have pooped
			expect(tamagotchi.getPoop()).toBe(1);
		});

		test('Pet dies when not properly cleaned', () => {
			// Initialise a new pet, with minimum food
			tamagotchi = new Tamagotchi(1);

			// Feed the pet enough to make it poop the maximum amount
			for (let i = 0; i < constants.maxPoop * constants.poopingThreshold; i += 1) {
				tamagotchi.feed();
			}

			// Check that the pet has died
			expect(tamagotchi.isAlive()).toBe(false);
		});

		test('Cleaning a pet decreases the amount of poop around it', () => {
			// Initialise a new pet, with minimum food
			tamagotchi = new Tamagotchi(1);

			// Feed the pet enough to make it poop
			for (let i = 0; i < constants.poopingThreshold; i += 1) {
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

		test("Pet's time with disease increments", () => {
			// Manually disease the pet
			tamagotchi.diseased = true;

			// Age the pet
			tamagotchi.increaseAge();

			// Expect the pet's time with disease counter to have incremented
			expect(tamagotchi.timeSpentDiseased).toBe(1);
		});

		test('Pet dies when not healed from disease quickly enough', () => {
			// Spy on the death function
			const spy = jest.spyOn(tamagotchi, 'die');

			// Manually disease the pet
			tamagotchi.diseased = true;

			// Set the pet as about to die from disease
			tamagotchi.timeSpentDiseased = constants.maxTimeSpentDiseased - 1;

			// Age the pet
			tamagotchi.increaseAge();

			// Check that the die function was called appropriately
			expect(spy).toHaveBeenCalledWith('disease');

			// Check that the pet has died
			expect(tamagotchi.isAlive()).toBe(false);
		});

		test('Healing can succeed', () => {
			// Manually disease the pet
			tamagotchi.diseased = true;

			// Manually set the chance of healing to 100%
			constants.chanceOfHealing = 100;

			// Attempt to heal the pet
			tamagotchi.heal();

			// Expect the pet to have been healed
			expect(tamagotchi.isDiseased()).toBe(false);
		});

		test('Healing can fail', () => {
			// Manually disease the pet
			tamagotchi.diseased = true;

			// Manually set the chance of healing to 0%
			constants.chanceOfHealing = 0;

			// Attempt to heal the pet
			tamagotchi.heal();

			// Expect the pet to have not been healed
			expect(tamagotchi.isDiseased()).toBe(true);
		});
	});
});
