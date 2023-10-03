export const capitalize = (text: string | null) => {
	const lowerCasedText = text?.toLowerCase() ?? ''
	return lowerCasedText.charAt(0).toUpperCase() + lowerCasedText.slice(1)
}
