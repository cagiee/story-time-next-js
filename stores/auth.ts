import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IUser } from "@/types/modules/auth";

interface IAuthState {
    token: string | null;
    user: IUser | null;
    isLoading: boolean;
    setToken: (token: string) => void;
    setUser: (user: IUser) => void;
    setLoading: (isLoading: boolean) => void;
    logout: () => void;
}

export const useAuth = create<IAuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isLoading: true,
            setToken: (token: string) => set({ token }),
            setUser: (user: IUser) => set({ user }),
            setLoading: (isLoading: boolean) => set({ isLoading }),
            logout: () => set({ token: null, user: null }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
