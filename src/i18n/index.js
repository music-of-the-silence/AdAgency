import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from './locales/en.json';
import frTranslation from './locales/fr.json';
import esTranslation from './locales/es.json';
import arTranslation from './locales/ar.json';
import hiTranslation from './locales/hi.json';

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    // eslint-disable-next-line no-undef
    debug: process.env.NODE_ENV !== 'production', // Only debug in dev
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: enTranslation
      },
      fr: {
        translation: frTranslation
      },
      es: {
        translation: esTranslation
      },
      ar: {
        translation: arTranslation
      },
      hi: {
        translation: hiTranslation
      }
    }
  });

export default i18n;