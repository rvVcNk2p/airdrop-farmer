import { LayerZeroNetworks } from '../../src/modules/farmer/types'
import { enumToArrayObject } from '../../src/modules/shared/utils/array'

describe('modules/shared/utils - array.ts - enumToArrayObject', () => {
	test.each([
		[
			LayerZeroNetworks,
			['APTOS', 'METIS'],
			[
				{
					id: 'ETHEREUM',
					value: 'ETHEREUM',
					invalid: false,
				},
				{
					id: 'ARBITRUM',
					value: 'ARBITRUM',
					invalid: false,
				},
				{
					id: 'POLYGON',
					value: 'POLYGON',
					invalid: false,
				},
				{
					id: 'OPTIMISM',
					value: 'OPTIMISM',
					invalid: false,
				},
				{
					id: 'BSC',
					value: 'BSC',
					invalid: false,
				},
				{
					id: 'AVALANCHE',
					value: 'AVALANCHE',
					invalid: false,
				},
				{
					id: 'FANTOM',
					value: 'FANTOM',
					invalid: false,
				},
				{
					id: 'METIS',
					value: 'METIS',
					invalid: true,
				},
				{
					id: 'APTOS',
					value: 'APTOS',
					invalid: true,
				},
			],
		],
	])(
		`should return a new array filled with objects, with the same length as the enum, and the invalid values as "invalid: true"`,
		(enums, invalidValues, expectedValue) => {
			// ACT
			const shortAddress = enumToArrayObject(enums, invalidValues)
			// ASSERT
			expect(shortAddress).toStrictEqual(expectedValue)
		},
	)
})
