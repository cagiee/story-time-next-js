import { FetchPromise, Store, ApiResponse } from "@/types/api";
import FetchFactory from "../factory";
import {
    IPostLogin,
    IUser,
    IPostRegister,
    IAuthResponse,
} from "@/types/modules/auth";

class AuthRepository extends FetchFactory {
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
    // updateProfile({
    //     body,
    // }: Store<IPostUpdateProfile>): FetchPromise<ApiResponse<{ user: IUser }>> {
    //     return this.call("/me", { method: "PATCH", data: body });
    // }
}

export default AuthRepository;
