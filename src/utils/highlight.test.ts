import chalk from 'chalk';
import highlight from './highlight';

describe('Highlighter', () => {
	test('Text is formatted correctly', () => {
		expect(highlight(1, 2, false)).toMatch('1/2');
	});

	test('Green highlighting', () => {
		// Assign a dummy function to chalk.green
		Object.defineProperty(chalk, 'green', { value: jest.fn() });

		// Perform a highlight that should invoke the green colour
		highlight(10, 10, false);

		// Check if green was applied
		expect(chalk.green).toHaveBeenCalled();
	});

	test.skip('Yellow highlighting', () => {
		// Assign a dummy function to chalk.yellow
		Object.defineProperty(chalk, 'yellow', { value: jest.fn() });

		// Perform a highlight that should invoke the yellow colour
		highlight(5, 10, false);

		// Check if yellow was applied
		expect(chalk.yellow).toHaveBeenCalled();
	});

	test('Red highlighting', () => {
		// Assign a dummy function to chalk.red
		Object.defineProperty(chalk, 'red', { value: jest.fn() });

		// Perform a highlight that should invoke the red colour
		highlight(0, 10, false);

		// Check if red was applied
		expect(chalk.red).toHaveBeenCalled();
	});
});
