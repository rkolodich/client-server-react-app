import i18n from 'i18next'
// import ChainedBackend from "i18next-chained-backend";
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from "i18next-http-backend"
import { initReactI18next } from 'react-i18next'

i18n
	.use(HttpBackend)
	.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		lng: 'en', // default language
		fallbackLng: 'en',
		defaultNS: 'common', // default namespace, if you don't want to specify it in JS files every time.
		interpolation: {
			escapeValue: false,
		},
		backend: {
			loadPath: '/public/i18n/{{lng}}/{{ns}}.json'
		}
	});

export default i18n;
