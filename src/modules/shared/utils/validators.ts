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
