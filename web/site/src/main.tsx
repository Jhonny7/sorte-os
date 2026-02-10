import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./globals.scss";
import { LoadingService, ThemeProvider, configureAlertService, initTranslations } from "common-lib";
import { I18nextProvider } from "react-i18next";
import i18n from "./services/Translate.service";
import translationEN from "./assets/i18n/en.json";
import translationES from "./assets/i18n/es.json";
import { themes } from "./environment/environment.prod";
import { AppProviders } from "./providers/AppProviders";

const activeLang = localStorage.getItem("active-language") ?? "es";

LoadingService.setGif("/loader.gif");

initTranslations({
  es: { translation: translationES },
  en: { translation: translationEN }
}, activeLang);

configureAlertService({
  Wrapper: ({ children }) => (
    <BrowserRouter>
      <AppProviders>{children}</AppProviders>
    </BrowserRouter>
  ),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider themes={themes}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
