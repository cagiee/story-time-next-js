import { FetchPromise, Store, ApiResponse } from "@/types/api";
import FetchFactory from "../factory";
import {
    IPostLogin,
    IUser,
    IPostRegister,
    IAuthResponse,
    IPostUpdateProfile,
} from "@/types/modules/auth";

interface IAuthRepository {
    login(params: Store<IPostLogin>): FetchPromise<ApiResponse<IAuthResponse>>;
}

class AuthRepository extends FetchFactory implements IAuthRepository {
    login({
        body,
    }: Store<IPostLogin>): FetchPromise<ApiResponse<IAuthResponse>> {
        return this.call(`/login`, { method: "POST", data: body });
    }
    register({
        body,
    }: Store<IPostRegister>): FetchPromise<ApiResponse<IAuthResponse>> {
        return this.call("/register", { method: "POST", data: body });
    }
    getProfile(): FetchPromise<ApiResponse<IUser>> {
        return this.call(`/me`, { method: "GET" });
    }
    updateProfile({
        body,
    }: Store<IPostUpdateProfile>): FetchPromise<ApiResponse<{ user: IUser }>> {
        return this.call("/me", { method: "PATCH", data: body });
    }
}

export default AuthRepository;
