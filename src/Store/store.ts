import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import workerSlice from "./Slices/workerSlice";
import systemSlice from "./systemSlice";
const store = configureStore({
    reducer: {
        auth: authSlice,
        worker: workerSlice,
        system: systemSlice,
    },
    devTools: true,
});

export default store;