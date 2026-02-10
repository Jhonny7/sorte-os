
import { themes } from "@/environment/environment.prod";
import { ThemeProvider } from "common-lib";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider themes={themes}>
      <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
    </ThemeProvider>
  );
}
