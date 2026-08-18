import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,

      setAuth: (token, user) => {
        set({
          token,
          user,
        });
      },

      clearAuth: () => {
        set({
          token: null,
          user: null,
        });
      },
    }),
    {
      name: "kheun-lift-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    },
  ),
);
