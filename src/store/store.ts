import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    bio: string;
    preferences: {
      email: boolean;
      notifications: boolean;
    };
    image: string
  } | null;

  setAuth: (user: { id: string; name: string; email: string; bio: string; preferences: { email: boolean; notifications: boolean }, image: string }) => void;
  clearAuth: () => void;
  updateUser: (data: Partial<{ name: string; bio: string; preferences: { email: boolean; notifications: boolean },image: string }>) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      setAuth: (user) =>
        set({
          isAuthenticated: true,
          user,
        }),

      clearAuth: () =>
        set({
          isAuthenticated: false,
          user: null,
        }),

      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    {
      name: "auth-storage",

      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
