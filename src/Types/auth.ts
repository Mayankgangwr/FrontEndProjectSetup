import { IUserResponse } from "./IUser";

export interface IAuthState {
    status: boolean;
    userData: IUserResponse | null;
    accessToken: string | null;
    refreshToken: string | null;
}