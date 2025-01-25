import {UserSubscription} from 'Redux/user/UserSubscriptionLevel.type';

export interface RegisterNewUserDTO {
    email: string;
    password: string
}

export interface LoginRequestDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
    token: string;
    email: string;
    subscriptionLevel: UserSubscription;
}