import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;

  setAuth: (user: { id: string; name: string; email: string }) => void;
  clearAuth: () => void;
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
    }),
    {
      name: "auth-storage",

      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
