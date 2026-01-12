import { FetchPromise, Store, ApiResponse } from "@/types/api";
import FetchFactory from "../factory";
import type {
    IPostChangePassword,
    IPostUpdateProfile,
    IPostUpdateProfileImage,
} from "@/types/modules/profile";
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
    updateProfileImage({ body }: Store<IPostUpdateProfileImage>) {
        return this.call("/me/profile-image", {
            method: "POST",
            data: body,
            options: {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        });
    }
    changePassword({ body }: Store<IPostChangePassword>) {
        return this.call("/me/change-password", {
            method: "POST",
            data: body,
        });
    }
}

export default ProfileRepository;
