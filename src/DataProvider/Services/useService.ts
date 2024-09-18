import { IApiResponse } from "../../Types/IapiResponse";
import apiResponse from "../../Utils/ApiResponse";
import axiosInstance from "./axiosInstance"; // Use centralized Axios instance

interface DocumentData {
    [key: string]: any;
}

/**
 * Custom service to manage API operations for collections and documents.
 * Provides basic CRUD operations for any specified collection.
 * @param {string} collectionName - Name of the API collection (e.g., "products")
 * @returns {Object} - Object containing CRUD API operations for the specified collection
 */
function useService(collectionName: string) {
    // API URL for the collection, will be appended to baseURL in axiosInstance
    const apiUrl = `/${collectionName}`;

    return {
        /**
         * Add a new document to the specified collection.
         * @param {DocumentData} data - The document data to be added
         * @returns {Promise<DocumentData>} - The added document data
         */
        addDocument: async (data: DocumentData): Promise<DocumentData> => {
            try {
                const response = await axiosInstance.post<IApiResponse>(apiUrl, data);
                return response.data;
            } catch (error) {
                console.error(`Error adding document to ${collectionName}:`, error);
                throw error;
            }
        },

        /**
         * Update an existing document in the collection.
         * @param {string} documentID - The ID of the document to update
         * @param {DocumentData} data - The updated document data
         * @returns {Promise<boolean>} - Returns true if update was successful, false otherwise
         */
        updateDocument: async (data: DocumentData): Promise<boolean> => {
            try {
                const response = await axiosInstance.patch<IApiResponse>(apiUrl, data);
                return apiResponse(
                    response.data,
                    (data) => data,
                    (message) => { throw new Error(message); }
                );
            } catch (error) {
                console.error(`Error updating document in ${collectionName}:`, error);
                return false;
            }
        },

        /**
         * Delete a document from the collection.
         * @param {string} documentID - The ID of the document to delete
         * @returns {Promise<boolean>} - Returns true if deletion was successful, false otherwise
         */
        deleteDocument: async (documentID: string): Promise<boolean> => {
            try {
                const response = await axiosInstance.delete<IApiResponse>(`${apiUrl}/${documentID}`);
                return apiResponse(
                    response.data,
                    (data) => data,
                    (message) => { throw new Error(message); }
                );
            } catch (error) {
                console.error(`Error deleting document from ${collectionName}:`, error);
                return false;
            }
        },

        /**
         * Retrieve all documents from the collection.
         * @returns {Promise<any[] | null>} - The array of documents, or null if an error occurs
         */
        getDocuments: async (): Promise<any[] | null> => {
            try {
                const response = await axiosInstance.get<IApiResponse>(`${apiUrl}/list`);
                return apiResponse(
                    response.data,
                    (data) => data,
                    (message) => { throw new Error(message); }
                );
            } catch (error) {
                console.error(`Error getting documents from ${collectionName}:`, error);
                return null;
            }
        },

        /**
         * Retrieve a single document by ID from the collection.
         * @param {string} documentID - The ID of the document to retrieve
         * @returns {Promise<DocumentData | null>} - The document data, or null if an error occurs
         */
        getDocument: async (documentID: string): Promise<DocumentData | null> => {
            try {
                const response = await axiosInstance.get<IApiResponse>(`${apiUrl}/${documentID}`);
                return apiResponse(
                    response.data,
                    (data) => data,
                    (message) => { throw new Error(message); }
                );
            } catch (error) {
                console.error(`Error getting document from ${collectionName}:`, error);
                return null;
            }
        }
    };
}

export default useService;
