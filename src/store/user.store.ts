import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../utils/types/user";

interface UserState {
  user: User | null;
  insertUser: () => void;
  logoutUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      insertUser: () => set((user: User) => ({ user })),
      logoutUser: () => set(() => ({ user: null })),
    }),
    { name: "user" }
  )
);
