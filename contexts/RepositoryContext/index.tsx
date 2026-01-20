import { createContext, useContext } from "react";
import { apiPlaceholder } from "@/configs/api";
import AuthRepository from "@/repositories/modules/auth";
import ProfileRepository from "@/repositories/modules/profile";
import StoryRepository from "@/repositories/modules/story";
import CategoryRepository from "@/repositories/modules/category";

interface IRepositoryContext {
    auth: AuthRepository;
    profile: ProfileRepository;
    story: StoryRepository;
    category: CategoryRepository;
}

const repositories: IRepositoryContext = {
    auth: new AuthRepository(apiPlaceholder),
    profile: new ProfileRepository(apiPlaceholder),
    story: new StoryRepository(apiPlaceholder),
    category: new CategoryRepository(apiPlaceholder),
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
            "useRepositories must be used within a RepositoryProvider",
        );
    }

    return context;
};
