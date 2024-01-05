export const sleep = (seconds: number) =>
	new Promise((r) => setTimeout(r, seconds * 1000))
