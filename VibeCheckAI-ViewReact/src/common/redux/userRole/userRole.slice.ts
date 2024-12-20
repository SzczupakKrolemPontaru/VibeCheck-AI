import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserRole} from './UserRole.type';

interface UserState {
    role: UserRole;
    token: string;
}

const initialState: UserState = {
    role: UserRole.ROLE_USER,
    token: ""
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setRole: (state, action: PayloadAction<UserState['role']>) => {
            state.role = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setUser: (state, action: PayloadAction<{role: UserRole, token: string}>) => {
            state.role = action.payload.role;
            state.token = action.payload.token;
        },
    },
});

export const { setRole, setToken, setUser } = userSlice.actions;
export default userSlice.reducer;