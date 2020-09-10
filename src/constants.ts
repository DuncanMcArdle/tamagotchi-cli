/**
 * This file contains game-wide constants. Changing them will affect both the game and its tests.
 */

// Miscellaenous
const maxAge = 100;
const maxFood = 100;
const maxEnergy = 100;
const minimumWakeupEnergy = 1;
const poopingThreshold = 3;
const maxPoop = 3;
const maxTimeSpentDiseased = 5;

// Chance variables (out of 100)
const riskOfDisease = 1;
const chanceOfHealing = 50;

// Export the constant, freezing them from change
export default module.exports = Object.freeze({
	maxAge,
	maxFood,
	maxEnergy,
	minimumWakeupEnergy,
	poopingThreshold,
	maxPoop,
	riskOfDisease,
	chanceOfHealing,
	maxTimeSpentDiseased,
});
