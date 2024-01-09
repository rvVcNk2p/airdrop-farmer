// https://react.i18next.com/latest/i18next-instance
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './public/locales/en/index'
import es from './public/locales/es/index'

const resources = {
	en,
	es,
}

i18n.use(initReactI18next).init({
	resources,
	lng: 'en',
})

export default i18n
