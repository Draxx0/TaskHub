import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import i18next from "i18next";
import global_en from "./locales/en/global.json";
import global_fr from "./locales/fr/global.json";
import auth_en from "./locales/en/auth.json";
import auth_fr from "./locales/fr/auth.json";
import workshops_en from "./locales/en/workshops.json";
import workshops_fr from "./locales/fr/workshops.json";
import settings_en from "./locales/en/settings.json";
import settings_fr from "./locales/fr/settings.json";
import boards_en from "./locales/en/boards.json";
import boards_fr from "./locales/fr/boards.json";
import { I18nextProvider } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePreferencesStore } from "./store/preferences.store.ts";

const preferencesStore = usePreferencesStore.getState();
export const storedLang = preferencesStore.language;

export const queryClient = new QueryClient();

i18next.init({
  interpolation: { escapeValue: false },
  lng: storedLang || "fr",
  fallbackLng: "en",
  resources: {
    fr: {
      global: global_fr,
      auth: auth_fr,
      workshops: workshops_fr,
      boards: boards_fr,
      settings: settings_fr
    },
    en: {
      global: global_en,
      auth: auth_en,
      workshops: workshops_en,
      boards: boards_en,
      settings: settings_en
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </QueryClientProvider>
);
