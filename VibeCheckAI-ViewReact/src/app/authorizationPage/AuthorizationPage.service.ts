
import {ApiResponse} from 'Utils/axiosUtils/ApiResponse.type';
import {LoginRequestDTO, LoginResponseDTO, RegisterNewUserDTO} from './AuthorizationPage.dto';

const API_URL = "http://localhost:8080/api/auth";

export const AuthorizationPageService = {
    registerUserRest: async (userDTO: RegisterNewUserDTO): Promise<ApiResponse<any>> => {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDTO)
        });
        return response.json();
    },

    createAuthenticationTokenRest: async (userDTO: LoginRequestDTO): Promise<ApiResponse<LoginResponseDTO>> => {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDTO)
        });
        return response.json();
    }
}