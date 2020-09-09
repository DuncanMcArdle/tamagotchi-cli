/**
 * This file contains game-wide constants. Changing them will affect both the game and its tests.
 */

const maxAge = 100;
const maxFood = 100;
const maxEnergy = 10;
const minimumWakeupEnergy = 1;

// Export the constant, freezing them from change
export default module.exports = Object.freeze({
	maxAge,
	maxFood,
	maxEnergy,
	minimumWakeupEnergy,
});
