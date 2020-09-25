import chalk from 'chalk';
import Game from './game.class';
import Tamagotchi from './tamagotchi.class';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import constants from '../constants';

describe('Game', () => {
	let game: Game;

	beforeEach(() => {
		// Mock the console logs and clears so they don't output during testing
		jest.spyOn(console, 'log').mockImplementation(jest.fn());
		jest.spyOn(console, 'clear').mockImplementation(jest.fn());

		// Initialise a game instance
		game = new Game();
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('Creating a game also created a Tamagotchi', () => {
		expect(game.tamagotchi).toBeInstanceOf(Tamagotchi);
	});

	test('Game ticks', async () => {
		// Watch the tick function
		const spy = jest.spyOn(game, 'gameTick');

		// Start a game
		const key = { name: 'n' };
		game.processKeyPress(key);

		// Wait for 1 tick
		await new Promise((r) => setTimeout(r, constants.tickRate));

		// Check that the tick function was called
		expect(spy).toHaveBeenCalled();
	});

	test('Game stops ticking once the pet dies', () => {
		// Watch for the clearInterval command which stops the tick
		const spy = jest.spyOn(window, 'clearInterval');

		// Kill the pet
		game.tamagotchi.die('test-death');
		game.gameTick();

		// Check that clearInterval was called
		expect(spy).toHaveBeenCalled();
	});

	test('Game ticks cause the Tamagotchi to age', () => {
		game.gameTick();
		expect(game.tamagotchi.getAge()).toBe(1);
	});

	test('Game ticks cause the Tamagotchi to use energy', () => {
		game.gameTick();
		expect(game.tamagotchi.getEnergy()).toBe(constants.maxEnergy - 1);
	});

	test('Game ticks cause the Tamagotchi to lose food', () => {
		game.gameTick();
		expect(game.tamagotchi.getFood()).toBe(constants.maxFood - 1);
	});

	test('A new Tamagotchi is created when pressing (n)ew post-death', () => {
		// Kill the current Tamagotchi
		game.tamagotchi.die('test-death');

		// Spy on the creation of a new Tamagotchi
		const spy = jest.spyOn(game, 'createTamagotchi');
		const key = { name: 'n' };
		game.processKeyPress(key);
		expect(spy).toHaveBeenCalled();
	});

	test('All buttons other than (n)ew are disabled during pre-game', () => {
		// Input the target key
		const key = { name: 'q' };
		game.processKeyPress(key);
		expect(game.lastMessage).not.toMatch('Command not recognised, try again.');
	});

	test('Game is stopped upon pressing x', () => {
		const spy = jest.spyOn(process, 'exit').mockImplementation();

		// Start a game
		game.firstRun = false;

		// Input the target key
		const key = { name: 'x' };
		game.processKeyPress(key);
		expect(spy).toHaveBeenCalled();
	});

	test('Game is stopped upon pressing Ctrl + c', () => {
		const spy = jest.spyOn(process, 'exit').mockImplementation();

		// Start a game
		game.firstRun = false;

		// Input the target key
		const key = { ctrl: true, name: 'c' };
		game.processKeyPress(key);
		expect(spy).toHaveBeenCalled();
	});

	test('Clean function is called upon pressing c', () => {
		const spy = jest.spyOn(game.tamagotchi, 'clean');

		// Start a game
		game.firstRun = false;

		// Input the target key
		const key = { name: 'c' };
		game.processKeyPress(key);
		expect(spy).toHaveBeenCalled();
	});

	test('Feed function is called upon pressing f', () => {
		const spy = jest.spyOn(game.tamagotchi, 'feed');

		// Start a game
		game.firstRun = false;

		// Input the target key
		const key = { name: 'f' };
		game.processKeyPress(key);
		expect(spy).toHaveBeenCalled();
	});

	test('Heal function is called upon pressing h', () => {
		const spy = jest.spyOn(game.tamagotchi, 'heal');

		// Start a game
		game.firstRun = false;

		// Input the target key
		const key = { name: 'h' };
		game.processKeyPress(key);
		expect(spy).toHaveBeenCalled();
	});

	test('Sleep function is called upon pressing s', () => {
		const spy = jest.spyOn(game.tamagotchi, 'putToSleep');

		// Start a game
		game.firstRun = false;

		// Input the target key
		const key = { name: 's' };
		game.processKeyPress(key);
		expect(spy).toHaveBeenCalled();
	});

	test('Wake function is called upon pressing w', () => {
		const spy = jest.spyOn(game.tamagotchi, 'wakeUp');

		// Start a game
		game.firstRun = false;

		// Input the target key
		const key = { name: 'w' };
		game.processKeyPress(key);
		expect(spy).toHaveBeenCalled();
	});

	test('Non-recognised command notifies the user', () => {
		// Start a game
		game.firstRun = false;

		// Input the target key
		const key = { name: 'q' };
		game.processKeyPress(key);
		expect(game.lastMessage).toMatch('Command not recognised, try again.');
	});

	test('User is notified of their pets disease once contracted', () => {
		// Spy on the console log
		const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn());

		// Give the pet a disease
		game.tamagotchi.diseased = true;

		// Call for the console to be updated
		game.updateConsole();

		// Check that the user was informed of a disease
		const testString = `WARNING: Your pet has a disease! It will die in ${constants.maxTimeSpentDiseased} seconds if you do not (h)eal it`;
		expect(consoleLogSpy).toHaveBeenCalledWith(chalk.red(testString));
	});
});
