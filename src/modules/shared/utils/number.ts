export const randomIntFromInterval = (
	min: string | number = 5,
	max: string | number = 30,
) =>
	parseFloat(
		(Math.random() * (Number(max) - Number(min)) + Number(min)).toFixed(2),
	)

export const randomWholeNumber = (min: number, max: number) => {
	const minNum = Number(min)
	const maxNum = Number(max)
	return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
}

export const roundNum = (num: number, length: number) => {
	var number = Math.round(num * Math.pow(10, length)) / Math.pow(10, length)
	return number
}
