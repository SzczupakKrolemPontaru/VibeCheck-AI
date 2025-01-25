export interface ApiResponse<T> {
    success: boolean;
    payload: T;
    message: string;
}