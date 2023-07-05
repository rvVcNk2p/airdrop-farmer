export const shortenerAddress = (
	address: string,
	prefix: number = 4,
	sufix: number = 4,
) => {
	return address.slice(0, prefix) + '...' + address.slice(-sufix)
}

export const padWallet = (
	address: string,
	lastChars: number = 20,
	sufix: number = 4,
) => {
	const last4Digits = address.slice(-sufix)
	const maskedAddress = last4Digits
		.padStart(address.length, '*')
		.slice(-lastChars)

	return maskedAddress
}
