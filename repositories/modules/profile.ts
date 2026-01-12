import { FetchPromise, Store, ApiResponse } from "@/types/api";
import FetchFactory from "../factory";
import type { IPostUpdateProfile } from "@/types/modules/profile";
import { IUser } from "@/types/modules/auth";

class ProfileRepository extends FetchFactory {
    getProfile(): FetchPromise<ApiResponse<IUser>> {
        return this.call(`/me`, { method: "GET" });
    }
    updateProfile({
        body,
    }: Store<IPostUpdateProfile>): FetchPromise<ApiResponse<{ user: IUser }>> {
        return this.call("/me", { method: "PATCH", data: body });
    }
}

export default ProfileRepository;
