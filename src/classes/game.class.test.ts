import chalk from 'chalk';
import Game from './game.class';
import Tamagotchi from './tamagotchi.class';

describe('Game', () => {
	let game;

	beforeEach(() => {
		game = new Game();
	});

	test('Creating a game also created a Tamagotchi', () => {
		expect(game.tamagotchi).toBeInstanceOf(Tamagotchi);
	});

	test.skip('Game ticks', () => {
		const spy = jest.spyOn(game, 'gameTick');
		jest.useFakeTimers();
		jest.advanceTimersByTime(5000);

		expect(spy).toHaveBeenCalled();

		// 		TODO
	});

	test('Game stops ticking once the pet dies', () => {
		const spy = jest.spyOn(window, 'clearInterval');
		game.tamagotchi.die('test-death');
		game.gameTick();
		expect(spy).toHaveBeenCalled();
	});

	test('Game ticks cause the Tamagotchi to age', () => {
		game.gameTick();
		expect(game.tamagotchi.getAge()).toBe(1);
	});

	test('A new Tamagotchi is created when pressing a key post-death', () => {
		// Kill the current Tamagotchi
		game.tamagotchi.die('test-death');

		// Spy on the creation of a new Tamagotchi
		const spy = jest.spyOn(game, 'createTamagotchi');
		const key = { name: 'q' };
		game.processKeyPress(key);
		expect(spy).toHaveBeenCalled();
	});

	test('Game is stopped upon pressing x', () => {
		const spy = jest.spyOn(process, 'exit').mockImplementation();
		const key = { name: 'x' };
		game.processKeyPress(key);
		expect(spy).toHaveBeenCalled();
	});

	test('Clean function is called upon pressing c', () => {
		const spy = jest.spyOn(game.tamagotchi, 'clean');
		const key = { name: 'c' };
		game.processKeyPress(key);
		expect(spy).toHaveBeenCalled();
	});

	test('Feed function is called upon pressing f', () => {
		const spy = jest.spyOn(game.tamagotchi, 'feed');
		const key = { name: 'f' };
		game.processKeyPress(key);
		expect(spy).toHaveBeenCalled();
	});

	test('Heal function is called upon pressing h', () => {
		const spy = jest.spyOn(game.tamagotchi, 'heal');
		const key = { name: 'h' };
		game.processKeyPress(key);
		expect(spy).toHaveBeenCalled();
	});

	test('Sleep function is called upon pressing s', () => {
		const spy = jest.spyOn(game.tamagotchi, 'putToSleep');
		const key = { name: 's' };
		game.processKeyPress(key);
		expect(spy).toHaveBeenCalled();
	});

	test('Wake function is called upon pressing w', () => {
		const spy = jest.spyOn(game.tamagotchi, 'wakeUp');
		const key = { name: 'w' };
		game.processKeyPress(key);
		expect(spy).toHaveBeenCalled();
	});

	test('Non-recognised command notifies the user', () => {
		const key = { name: 'q' };
		game.processKeyPress(key);
		expect(game.lastMessage).toMatch('Command not recognised, try again.');
	});

	test('User is notified of their pets disease once contracted', () => {
		// Assign a dummy function to chalk.red
		Object.defineProperty(chalk, 'red', { value: jest.fn() });

		// Give the pet a disease
		game.tamagotchi.diseased = true;

		// Call for the console to be updated
		game.updateConsole();

		// Check that the disease has been reported in red
		expect(chalk.red).toHaveBeenCalled();
	});
});
