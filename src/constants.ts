/**
 * This file contains game-wide constants. Changing them will affect both the game and its tests.
 */

const maxAge = 10;

// Export the constant, freezing them from change
export default module.exports = Object.freeze({
	maxAge,
});
