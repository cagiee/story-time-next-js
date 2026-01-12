export interface IPostLogin {
    email: string;
    password: string;
}
export interface IPostRegister {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
export interface IAuthResponse {
    user: IUser;
    token: string;
}
export interface IUser {
    id: number;
    name: string;
    email: string;
    profile_image: string;
    about: string;
    created_at: string;
    updated_at: string;
}
