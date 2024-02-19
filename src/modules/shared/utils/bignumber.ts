import rawUnits from '@modules/shared/constants/units.json'
import BigNumber from 'bignumber.js'

const re = RegExp(/^[0-9]+\.?[0-9]*$/)
const units = {}

Object.keys(rawUnits).map(function (unit) {
	// @ts-ignore
	units[unit] = new Number(rawUnits[unit], 10)
})

// https://github.com/ethereumjs/ethereumjs-units?tab=readme-ov-file
export const convert = (value: any, from: any, to: any) => {
	if (!re.test(value)) {
		throw new Error('Unsupported value')
	}

	from = from.toLowerCase()
	// @ts-ignore
	if (!units[from]) {
		throw new Error('Unsupported input unit')
	}

	to = to.toLowerCase()
	// @ts-ignore
	if (!units[to]) {
		throw new Error('Unsupported output unit')
	}

	return (
		new BigNumber(value, 10)
			// @ts-ignore
			.multipliedBy(units[from])
			.integerValue(BigNumber.ROUND_DOWN)
			// @ts-ignore
			.dividedBy(units[to])
			.toString(10)
	)
}
