import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LangEn from './Resources/lang.en';
import LangVi from './Resources/lang.vi';
const defaultLang = 'en';
const resources = {
  en: LangEn,
  vi: LangVi,
};

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLang,
  fallbackLng: defaultLang,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
