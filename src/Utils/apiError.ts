// Private method to handle errors in API requests
export const handleError = (error: any) => {
    console.error("API error:", error.response?.data || error.message || error); // Log the error details
    throw error; // Throw the error for further handling
}