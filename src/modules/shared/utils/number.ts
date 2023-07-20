export const randomIntFromInterval = (min: number = 5, max: number = 30) =>
	parseFloat((Math.random() * (max - min + 1) + min).toFixed(2))

export const roundNum = (num: number, length: number) => {
	var number = Math.round(num * Math.pow(10, length)) / Math.pow(10, length)
	return number
}
