export const capitalize = (text: string | null) => {
	const lowerCasedText = text?.toLowerCase().trim() ?? ''
	return lowerCasedText.charAt(0).toUpperCase() + lowerCasedText.slice(1)
}
