import {
	padWallet,
	shortenerAddress,
} from '../../src/modules/shared/utils/address'

describe('modules/shared/utils - address.ts - shortenerAddress', () => {
	test.each([
		['0xe5e667497f6bf120d64e972bbbfbdeb7797aab8d', 4, 4, '0xe5...ab8d'],
		['0x329c05c335d5fd3f18600e5a05280e911f083048', 4, 4, '0x32...3048'],
	])(
		`should return the short address "%s" with prefix "%s" and sufix "%s" as "%s"`,
		(address, prefix, sufix, expectedValue) => {
			// ACT
			const shortAddress = shortenerAddress(address, prefix, sufix)
			// ASSERT
			expect(shortAddress).toBe(expectedValue)
		},
	)
})

describe('modules/shared/utils - address.ts - padWallet', () => {
	test.each([
		[
			'0xe5e667497f6bf120d64e972bbbfbdeb7797aab8d',
			20,
			6,
			'**************7aab8d',
		],
		[
			'0x329c05c335d5fd3f18600e5a05280e911f083048',
			20,
			4,
			'****************3048',
		],
	])(
		`
	should return the short address "%s" with prefix "%s" and sufix "%s" as "%s"
	`,
		(address, lastChars, sufix, expectedValue) => {
			// ACT
			const shortAddress = padWallet(address, lastChars, sufix)
			// ASSERT
			expect(shortAddress).toBe(expectedValue)
		},
	)
})
