import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Theme {
    Light = "light",
    Dark = "dark"
}

export interface System {
    id: string | null;
    name: string | null;
    theme: Theme;
    lang: string | null;
    location: string | null;
    timeZone: string | null;
}

interface SystemState {
    system: System;
}

const initialState: SystemState = {
    system: {
        id: null,
        name: null,
        theme: Theme.Light,
        lang: "en",
        location: null,
        timeZone: null
    }
};

const systemSlice = createSlice({
    name: "system",
    initialState,
    reducers: {
        setSystem: (state, action: PayloadAction<System>) => {
            state.system = action.payload;
        },
        
    },
});

export const { setSystem } = systemSlice.actions;
export default systemSlice.reducer;
