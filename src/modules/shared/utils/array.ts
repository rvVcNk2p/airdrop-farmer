export const enumToArrayObject = (stringEnum: any, invalidOptions?: any[]) =>
	Object.keys(stringEnum).map((id) => {
		return {
			id,
			value: stringEnum[id as keyof typeof stringEnum],
			invalid: invalidOptions?.includes(id as keyof typeof stringEnum),
		}
	})
