import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWorkerResponse } from "../../Types/IWorkers";

interface Iworkers {
    workers: IWorkerResponse[] | [];
};
const initialState: Iworkers = {
    workers: []
};
const workerSlice = createSlice({
    name: "worker",
    initialState,
    reducers: {
        setWorker: (state, action: PayloadAction<IWorkerResponse[] | []>) => {
            state.workers = action.payload;
        },
        createWorker: (state, action: PayloadAction<IWorkerResponse>) => {
            state.workers = [...state.workers, action.payload];
        },
        updateWorker: (state, action: PayloadAction<IWorkerResponse>) => {
            const workerIdx = state.workers.findIndex((worker: IWorkerResponse) => worker._id === action.payload._id);
            if (workerIdx !== -1) {
                state.workers[workerIdx] = { ...action.payload };
            }
        },
        deleteWorker: (state, action: PayloadAction<string>) => {
            const workerIdx = state.workers.findIndex((worker: IWorkerResponse) => worker._id === action.payload);
            if (workerIdx !== -1) {
                state.workers.splice(workerIdx, 1);
            }
        },
    },
});

export const { setWorker, createWorker, updateWorker, deleteWorker } = workerSlice.actions;
export default workerSlice.reducer;
