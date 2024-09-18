// Interface for the API response structure
export interface IApiResponse<T> {
    statusCode: number;
    data: T | null;
    message: string;
    success: boolean;
}

/**
 * Utility function to handle API responses.
 * @param {IApiResponse<T>} response - The API response object
 * @param {Function} onSuccess - Callback function to handle successful response
 * @param {Function} onError - Callback function to handle errors
 * @returns {T} - Returns the successful data or throws an error
 */
function apiResponse<T>(
    response: IApiResponse<T>,
    onSuccess: (data: T) => T,
    onError: (message: string) => never
): T {
    if (response.success) {
        return onSuccess(response.data!); // Use non-null assertion as `data` is guaranteed to be present if `success` is true
    } else {
        return onError(response.message); // This will throw the error
    }
}

export default apiResponse;
