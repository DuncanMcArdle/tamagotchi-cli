/**
 * This file contains game-wide constants. Changing them will affect both the game and its tests.
 *
 * @typedef {Object} constants
 * @property {number} maxAge The maximum age a pet can live to before dying
 * @property {number} maxFood The maximum age a pet can live to before dying
 * @property {number} maxEnergy The maximum energy a pet can have
 * @property {number} minimumWakeupEnergy The minimum amount of energy required for a pet to wake up
 * @property {number} poopingThreshold The amount of food a pet can consume before pooping
 * @property {number} maxPoop The maximum poop a pet can be surrounded by before dying
 * @property {number} riskOfDisease The odds of contracting a disease per age (out of 100)
 * @property {number} chanceOfHealing The odds of healing a disease per attempt (out of 100)
 * @property {number} maxTimeSpentDiseased The maximum amount of time a pet can be diseased before dying
 * @property {number} tickRate The number of milliseconds per tick
 */
const constants = {
	maxAge: 100,
	maxFood: 50,
	maxEnergy: 50,
	minimumWakeupEnergy: 1,
	poopingThreshold: 3,
	maxPoop: 3,
	maxTimeSpentDiseased: 20,
	riskOfDisease: 5,
	chanceOfHealing: 50,
	tickRate: 1000,
};

export default constants;
