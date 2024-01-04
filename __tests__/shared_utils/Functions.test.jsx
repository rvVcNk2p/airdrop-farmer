import { sleep } from '../../src/modules/shared/utils/functions'

describe('modules/shared/utils - functions.ts - sleep', () => {
	test.each([0.2, 0.1, 0.4])(
		`sleep() should wait %s milliseconds and then call the callback function`,
		async (ms) => {
			// ACT
			const startTime = Date.now()
			await sleep(ms)
			const endTime = Date.now()
			const elapsedSeconds = (endTime - startTime) / 1000
			const tolerance = 0.01
			// ASSERT
			expect(elapsedSeconds).toBeGreaterThanOrEqual(ms - tolerance)
			expect(elapsedSeconds).toBeLessThanOrEqual(ms + tolerance)
		},
	)
})
