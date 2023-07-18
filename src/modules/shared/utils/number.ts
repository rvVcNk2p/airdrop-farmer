export const randomIntFromInterval = (min: number = 5, max: number = 30) =>
	parseFloat((Math.random() * (max - min + 1) + min).toFixed(2))
