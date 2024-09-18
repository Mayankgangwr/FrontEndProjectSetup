import { IWorkerRequest, IWorkerResponse } from "../../Types/IWorkers";
import useService from "../Services/useService";

class WorkerController {
    colleactionRef;
    constructor() {
        this.colleactionRef = useService("restaurant/worker");
    }
    async addWorker(workerData: IWorkerRequest) {
        try {
            return await this.colleactionRef.addDocument(workerData);
        } catch (err) {
            console.log("API service :: createWorker :: errr", err);
        }
    }
    async updateWorker(workerData: any) {
        try {
            return await this.colleactionRef.updateDocument(workerData);
        } catch (err) {
            console.log("API service :: updateWorker :: errr", err);
        }
    }

    async deleteWorker(documentID: string) {
        try {
            await this.colleactionRef.deleteDocument(documentID);
            return true;
        } catch (err) {
            console.log("API service :: deleteWorker :: errr", err);
            return false;
        }
    }

    async getWorkers(): Promise<IWorkerResponse[] | null> {
        try {
            const data = await this.colleactionRef.getDocuments();
            return data
        } catch (err) {
            console.log("API service :: getWorker :: errr", err);
            return null;
        }
    }

    async getWorker(documentID: string) {
        try {
            return await this.colleactionRef.getDocument(documentID);
        } catch (err) {
            console.log("API service :: getTeam :: errr", err);
            return null;
        }
    }
}
const workerController = new WorkerController();
export default workerController;