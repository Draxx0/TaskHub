import { Language } from "@/utils/types/language";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PreferencesState {
  language: Language | null;
  changeLanguage: (language: Language) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      language: (localStorage.getItem("language") as Language) || "fr",
      changeLanguage: (language: Language | null) => set(() => ({ language })),
    }),

    { name: "language" }
  )
);
