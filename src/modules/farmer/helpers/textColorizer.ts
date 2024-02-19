export enum ColorizedTextTypes {
	TOKEN = 'text-purple-500',
	NETWORK = 'text-yellow-500',
	LINK = 'text-blue-500',
}
export const getColorizedText = (text: string, color: ColorizedTextTypes) => {
	return `<span className="${color}">${text}</span>`
}
