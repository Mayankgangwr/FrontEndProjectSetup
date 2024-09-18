import axios, { AxiosInstance } from 'axios';
import authController from '../Controllers/AuthController'; // Import AuthController for logout and refreshToken methods

// Create a central Axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`, // Base URL for your API
    withCredentials: true, // Ensure cookies (accessToken, refreshToken) are sent with requests
    headers: {
        'Content-Type': 'application/json', // Set default content type
    },
});

// Set Authorization header for every request if accessToken exists
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`; // Add Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor to handle token expiration and refreshing
axiosInstance.interceptors.response.use(
    (response) => response, // If the response is successful, return it
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired access token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried

            try {
                // Attempt to refresh the token using AuthController
                const refreshToken = localStorage.getItem('refreshToken');
                const { accessToken, refreshToken: newRefreshToken } = refreshToken ?
                    await authController.refreshToken(refreshToken) :
                    await authController.refreshToken();

                // Store the new tokens in localStorage
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                // Update the original request headers with the new access token
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                // Retry the original request with the updated token
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // If refreshing the token fails, log the user out
                authController.logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error); // If it's not a 401 error, reject the promise
    }
);

export default axiosInstance;
