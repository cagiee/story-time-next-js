import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/stores/auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (!user && !isLoading) {
            router.push("/auth/login");
        }
    }, [user, router, isLoading]);

    // Show a loading state or nothing while checking auth
    if (isLoading || !user) {
        return <div>Loading... {isLoading ? "T" : "F"}</div>;
    }

    return children;
};

export default ProtectedRoute;
