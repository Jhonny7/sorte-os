import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../assets/i18n/en.json";
import translationES from "../assets/i18n/es.json";
import {
  LocalStorageEncryptService,
} from "common-lib";

const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  }
};

i18n.use(initReactI18next)
.init({
  // we init with resources
  resources,
  fallbackLng: ['en','es'],
  //debug: true,
  languages: ['en','es'],
  debug: false,
  lng: LocalStorageEncryptService.getFromLocalStorage("language"),
  // have a common namespace used around the full app
  ns: ["translation"],
  defaultNS: "translation",
});

export default i18n;
