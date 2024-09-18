export interface IApiResponse {
    statusCode: number;
    data: any | null;
    message: string;
    success: boolean;
}