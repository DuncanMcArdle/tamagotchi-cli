/**
 * This file contains game-wide constants. Changing them will affect both the game and its tests.
 */

const maxAge = 100;
const maxFood = 100;
const maxEnergy = 100;
const minimumWakeupEnergy = 1;
const poopingThreshold = 3;
const maxPoop = 3;

// Export the constant, freezing them from change
export default module.exports = Object.freeze({
	maxAge,
	maxFood,
	maxEnergy,
	minimumWakeupEnergy,
	poopingThreshold,
	maxPoop,
});
