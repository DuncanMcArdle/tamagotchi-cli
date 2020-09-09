import Tamagotchi from './tamagotchi.class';

describe('Tamagotchi', () => {
	describe('Feeding', () => {
		let tamagotchi;
		const startingFood = 9;

		beforeEach(() => {
			tamagotchi = new Tamagotchi(new Date(), startingFood);
		});

		test("Pet's food level is retrieved successfully", () => {
			expect(tamagotchi.getFood()).toBe(startingFood);
		});

		test("Pet's food level goes up when fed cannot be fed when full", () => {
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
	});
});
