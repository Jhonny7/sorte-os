// common-lib/src/i18n/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const initTranslations = async (resources: any, lng: string = 'es') => {
  if (!i18n.isInitialized) {
    await i18n
      .use(initReactI18next)
      .init({
        lng,
        fallbackLng: 'es',
        resources,
        interpolation: {
          escapeValue: false
        },
        react: {
          useSuspense: false
        }
      });
  }
};

export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
};

export default i18n;
