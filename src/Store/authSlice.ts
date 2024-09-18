import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserResponse } from "../Types/IUser";
import { IAuthState } from "../Types/auth";

const initialState: IAuthState = {
    status: false,
    userData: null,
    accessToken: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ userdata: IUserResponse; accessToken: string; refreshToken: string }>) => {
            state.status = true;
            state.userData = action.payload.userdata;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
