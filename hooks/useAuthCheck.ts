// hooks/useAuthCheck.js
import { useRepositories } from "@/contexts";
import { useAuth } from "@/stores/auth";

export const useAuthCheck = () => {
    const api = useRepositories();
    const authStore = useAuth();

    const checkAuth = async () => {
        try {
            if (!authStore.token) {
                return false;
            }

            const {
                data: { data },
            } = await api.profile.getProfile();
            authStore.setUser(data);
            return true;
        } catch (error) {
            console.error("Auth check failed", error);
            return false;
        }
    };

    return { checkAuth };
};
