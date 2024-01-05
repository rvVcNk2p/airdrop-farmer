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
					value: 'Ethereum',
					invalid: false,
				},
				{
					id: 'ARBITRUM',
					value: 'Arbitrum',
					invalid: false,
				},
				{
					id: 'POLYGON',
					value: 'Polygon',
					invalid: false,
				},
				{
					id: 'OPTIMISM',
					value: 'Optimism',
					invalid: false,
				},
				{
					id: 'BSC',
					value: 'Bsc',
					invalid: false,
				},
				{
					id: 'AVALANCHE',
					value: 'Avalanche',
					invalid: false,
				},
				{
					id: 'FANTOM',
					value: 'Fantom',
					invalid: false,
				},
				{
					id: 'METIS',
					value: 'Metis',
					invalid: true,
				},
				{
					id: 'APTOS',
					value: 'Aptos',
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
