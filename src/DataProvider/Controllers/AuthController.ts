import axios, { AxiosInstance, AxiosResponse } from "axios";
import apiResponse, { IApiResponse } from "../../Utils/ApiResponse"; // Import the response handling utility function
import { handleError } from "../../Utils/apiError";
import { ILoginState } from "../../Types";
import { IUserRequest } from "../../Types/IUser";

// AuthController class to manage authentication-related API calls
class AuthController {
    private axiosInstance: AxiosInstance; // Axios instance for making HTTP requests
    // Constructor initializes the Axios instance with the API base URL
    constructor(apiUrl: string) {
        this.axiosInstance = axios.create({
            baseURL: apiUrl, // Set the base URL for the API
            withCredentials: true, // Ensure cookies (accessToken, refreshToken) are sent with requests
        });
    }

    // Register method to add new user
    async register(data: IUserRequest): Promise<any> {
        try {
            const response: AxiosResponse<IApiResponse<any>> = await this.axiosInstance.post("/restaurant/register", data);
            return apiResponse(
                response.data,
                (data) => data,
                (message) => { throw new Error(message); }
            );
        } catch (error) {
            return handleError(error); // Handle sign up errors
        }
    }

    // Login method to authenticate the user
    async login(data: ILoginState): Promise<any> {
        try {
            const response: AxiosResponse<IApiResponse<any>> = await this.axiosInstance.post("/restaurant/login", data);
            return apiResponse(
                response.data,
                (data) => data,
                (message) => { throw new Error(message); }
            );
        } catch (error) {
            return handleError(error); // Handle login errors
        }
    }

    // Method to retrieve the current user information
    async getCurrentUser(): Promise<any | null> {
        try {
            // Make a POST request to fetch current user information 
            const response: AxiosResponse<IApiResponse<any>> = await this.axiosInstance.get("/restaurant/me");
            // Process and return the user data from the API response
            return apiResponse(
                response.data,
                (data) => data, // Return the user data on success
                (message) => { throw new Error(`Failed to fetch user data: ${message}`); } // Detailed error message on failure
            );
        } catch (error) {
            return null; // Return null if there is an error
        }
    }

    // Method to refresh the access token using the refresh token
    async refreshToken(refreshToken: string | undefined = undefined): Promise<any> {
        try {
            const response: AxiosResponse<IApiResponse<any>> = await this.axiosInstance.post("/restaurant/refresh-token", { refreshToken });
            return apiResponse(
                response.data,
                (data) => data, // Simply return the data on success
                (message) => { throw new Error(message); } // Throw error on failure
            );
        } catch (error) {
            return handleError(error); // Handle errors during token refresh
        }
    }

    // Logout method to clear tokens and end the user's session
    async logout(): Promise<any> {
        try {
            const response: AxiosResponse<IApiResponse<any>> = await this.axiosInstance.post("/restaurant/logout");

            // Clear access and refresh tokens from localStorage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            return apiResponse(
                response.data,
                (data: any) => data,
                (message: string) => { throw new Error(message); }
            );
        } catch (error) {
            return handleError(error); // Handle errors during logout
        }
    }
}

// Define the API URL from environment variables
const apiUrl = `${import.meta.env.VITE_API_BASE_URL}`;

// Create an instance of the AuthController with the API URL
const authController = new AuthController(apiUrl);

// Export the AuthController instance for use in other parts of the application
export default authController;
