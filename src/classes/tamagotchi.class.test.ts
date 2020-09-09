import Tamagotchi from './tamagotchi.class';

const { maxAge } = require('../constants');

describe('Tamagotchi', () => {
	let tamagotchi;
	const startingFood = 9;

	beforeEach(() => {
		tamagotchi = new Tamagotchi(new Date(), startingFood);
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

			// Check that the pet has reahed maximum age
			expect(tamagotchi.getAge()).toBe(maxAge);

			// Check that the pet has died
			expect(tamagotchi.isAlive()).toBe(false);
		});
	});
});
