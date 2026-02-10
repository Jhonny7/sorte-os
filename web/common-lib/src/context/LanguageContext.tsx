import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { changeLanguage } from "../i18n/i18n";

type Language = string;

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  availableLanguages: Language[];
}

interface LanguageProviderProps {
  children: ReactNode;
  languages: Language[];
  defaultLanguage?: Language;
}

const LOCAL_STORAGE_KEY = "active-language";

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({
  children,
  languages,
  defaultLanguage = languages[0],
}: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved && languages.includes(saved) ? saved : defaultLanguage;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, language);
    changeLanguage(language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    if (languages.includes(lang)) {
      setLanguageState(lang);
    } else {
      console.warn(`Idioma "${lang}" no está permitido`);
    }
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, availableLanguages: languages }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe ir dentro de LanguageProvider");
  }
  return context;
};
