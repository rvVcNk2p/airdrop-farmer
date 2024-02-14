export const minMaxValidator = (val: { min: number; max: number }) => {
	const { min, max } = val
	if (min === undefined && max === undefined) return true
	if (min === undefined || max === undefined) return false
	return min <= max
}

export const minMaxErrorObject = {
	message: 'Minimum value should be less than or equal to maximum value.',
	path: ['min'],
}

export const fromToValidator = (val: { from: number; to: number }) => {
	const { from, to } = val
	if (from === undefined && to === undefined) return true
	if (from === undefined || to === undefined) return false
	return from < to
}

export const fromToErrorObject = {
	message: '"From" value should be less than or equal to "to" value.',
	path: ['min'],
}
