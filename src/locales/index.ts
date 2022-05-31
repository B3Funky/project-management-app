import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ru from './ru.json';

const resources = {
  en,
  ru,
};

const defaultLocale = localStorage.getItem('locale') || 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLocale,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
