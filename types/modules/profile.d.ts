export interface IPostUpdateProfile {
    name: string;
    about: string | null;
}
export interface IPostUpdateProfileImage {
    profile_image: Blob;
}

export interface IPostChangePassword {
    old_password: string;
    new_password: string;
    new_password_confirmation: string;
}
