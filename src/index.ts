import readline from 'readline';
import Game from './classes/game.class';

// Initilise the game
const game = new Game();

// Pass key presses into the game
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
	game.processKeyPress(key);
});
