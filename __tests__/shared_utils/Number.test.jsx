import {
	randomIntFromInterval,
	roundNum,
} from '../../src/modules/shared/utils/number'

describe('modules/shared/utils - number.ts - randomIntFromInterval', () => {
	test.each([
		[5, 30],
		[8, 15],
		[20, 25],
	])(
		`
		randomIntFromInterval() should return a random integer between %s and %s
	`,
		async (min, max) => {
			// ACT
			const result = randomIntFromInterval(min, max)
			// ASSERT
			expect(result).toBeGreaterThanOrEqual(min)
			expect(result).toBeLessThanOrEqual(max)
		},
	)
})

describe('modules/shared/utils - number.ts - roundNum', () => {
	test('roundNum() should a number to 14 decimal places', async () => {
		// Arrange
		const num = 3.141592653589793
		const expected = 3.14159265358979
		// Act
		const result = roundNum(num, 14)
		// Assert
		expect(result).toBe(expected)
	})
})
