import * as shared from './shared.json'
import * as signin from './signin.json'
import * as signup from './signup.json'

const locales = {
	...shared,
	...signin,
	...signup,
}

export default locales
