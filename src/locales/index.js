import i18n from 'i18next';
import en from './en.json';
import ru from './ru.json';
import { initReactI18next } from 'react-i18next';

const resources = {
  en,
  ru,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
