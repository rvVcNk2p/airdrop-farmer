export const getObjectPaths = (obj: any, path = '') => {
	let paths: any = []
	for (let key in obj) {
		if (
			typeof obj[key] === 'object' &&
			!Array.isArray(obj[key]) &&
			obj[key] !== null
		) {
			paths = paths.concat(getObjectPaths(obj[key], path + key + '.'))
		} else {
			paths.push({ path: path + key, value: obj[key] })
		}
	}
	return paths
}
