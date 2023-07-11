export const capitalize = (text: string) => {
	const lowerCasedText = text.toLowerCase()
	return lowerCasedText.charAt(0).toUpperCase() + lowerCasedText.slice(1)
}
