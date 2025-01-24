import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserSubscription} from './UserSubscriptionLevel.type';

interface UserState {
    subscription: UserSubscription;
    token: string;
}

const initialState: UserState = {
    subscription: UserSubscription.FREE,
    token: ""
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setRole: (state, action: PayloadAction<UserState['subscription']>) => {
            state.subscription = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setUser: (state, action: PayloadAction<{role: UserSubscription, token: string}>) => {
            state.subscription = action.payload.role;
            state.token = action.payload.token;
        },
    },
});

export const { setRole, setToken, setUser } = userSlice.actions;
export default userSlice.reducer;