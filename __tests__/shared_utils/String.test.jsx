import { capitalize } from '../../src/modules/shared/utils/string'

describe('modules/shared/utils - string.ts - capitalize', () => {
	test.each([
		['   almafa    ', 'Almafa'],
		[' kortefa  ', 'Kortefa'],
	])(
		`
		shoud return the capitalized version of the string
	`,
		async (defaultStr, capitalizedStr) => {
			// ACT
			const result = capitalize(defaultStr, capitalizedStr)
			// ASSERT
			expect(result).toBe(capitalizedStr)
		},
	)
})
