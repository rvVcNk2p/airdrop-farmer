export const sleep = (ms: number) =>
	new Promise((r) => setTimeout(r, ms * 1000))
