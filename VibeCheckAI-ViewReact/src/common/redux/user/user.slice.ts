import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserSubscription} from './UserSubscriptionLevel.type';

interface UserState {
    subscriptionLevel: UserSubscription;
    token: string;
    email: string;
}

const initialState: UserState = {
    subscriptionLevel: UserSubscription.FREE,
    token: "",
    email: ""
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setUser: (state, action: PayloadAction<{subscriptionLevel: UserSubscription, token: string, email: string}>) => {
            state.subscriptionLevel = action.payload.subscriptionLevel;
            state.token = action.payload.token;
            state.email = action.payload.email;
        },
    },
});

export const { setToken, setUser } = userSlice.actions;
export default userSlice.reducer;