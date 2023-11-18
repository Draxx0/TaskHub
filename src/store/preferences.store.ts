import { Board } from "@/utils/types/board";
import { Language } from "@/utils/types/language";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PreferencesState {
  language: Language | null;
  changeLanguage: (language: Language) => void;
  favorites: Board[];
  addFavorite: (board: Board) => void;
  removeFavorite: (board: Board) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      language: (localStorage.getItem("language") as Language) || "fr",
      changeLanguage: (language: Language | null) => set(() => ({ language })),
      favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
      addFavorite: (board: Board) =>
        set((state) => ({
          favorites: [...state.favorites, board],
        })),
      removeFavorite: (board: Board) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (favorite) => favorite.id !== board.id
          ),
        })),
    }),

    { name: "language" }
  )
);
