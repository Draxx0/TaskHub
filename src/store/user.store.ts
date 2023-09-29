import { User } from "firebase/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  insertUser: (user: User) => void;
  logoutUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      insertUser: (user: User | null) => set(() => ({ user })),
      logoutUser: () => set(() => ({ user: null })),
    }),
    { name: "user" }
  )
);
