import { createContext, useContext } from "react";
import { apiPlaceholder } from "@/configs/api";
import AuthRepository from "@/repositories/modules/auth";

interface IRepositoryContext {
    auth: AuthRepository;
}

const repositories: IRepositoryContext = {
    auth: new AuthRepository(apiPlaceholder),
};

export const RepositoryContext =
    createContext<IRepositoryContext>(repositories);

interface RepositoryProviderProps {
    children: React.ReactNode;
}

export const RepositoryProvider: React.FC<RepositoryProviderProps> = ({
    children,
}) => {
    return (
        <RepositoryContext.Provider value={repositories}>
            {children}
        </RepositoryContext.Provider>
    );
};

export const useRepositories = () => {
    const context = useContext(RepositoryContext);

    if (!context) {
        throw new Error(
            "useRepositories must be used within a RepositoryProvider"
        );
    }

    return context;
};
