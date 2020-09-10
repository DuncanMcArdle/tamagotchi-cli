const chalk = require('chalk');

/**
 * Highlight a value based on its potential maximum value
 * @param {number} value The value being highlighted
 * @param {number} maxValue The maxmium value (used to calculate colours))
 * @param {boolean} inverted Whether or not to invert the numbers (scale downwards)
 */
export default function highlight(value: number, maxValue: number, inverted: boolean) {
	// Format the input value into an "out of" layout
	const formattedValue = `${value}/${maxValue}`;

	// Check if the value has dropped below 10% of its potential
	if ((!inverted && value <= maxValue / 10) || (inverted && value >= maxValue - maxValue / 10)) {
		return chalk.red(formattedValue);
	}

	// Check if the value has dropped below 50% of its potential
	if ((!inverted && value <= maxValue / 2) || (inverted && value >= maxValue - maxValue / 2)) {
		return chalk.yellow(formattedValue);
	}
	return chalk.green(formattedValue);
}
