import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IUser } from "@/types/modules/auth";

interface IAuthState {
    token: string | null;
    user: IUser | null;
    setToken: (token: string) => void;
    setUser: (user: IUser) => void;
    logout: () => void;
}

export const useAuth = create<IAuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            setToken: (token: string) => set({ token }),
            setUser: (user: IUser) => set({ user }),
            logout: () => set({ token: null, user: null }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
