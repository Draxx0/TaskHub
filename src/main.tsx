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
import { I18nextProvider } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

i18next.init({
  interpolation: { escapeValue: false },
  lng: "auto",
  fallbackLng: "fr",
  resources: {
    fr: {
      global: global_fr,
      auth: auth_fr,
      workshops: workshops_fr,
    },
    en: {
      global: global_en,
      auth: auth_en,
      workshops: workshops_en,
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
