import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserSubscriptionLevel} from "Redux/userSubscriptionLevel/UserSubscriptionLevel.type";

interface UserSubscriptionLevelState {
    userSubscriptionLevel: UserSubscriptionLevel;
}

const initialState: UserSubscriptionLevelState = {
    userSubscriptionLevel: UserSubscriptionLevel.FREE,
};

const userSubscriptionLevelSlice = createSlice({
    name: 'userSubscriptionLevel',
    initialState,
    reducers: {
        setUserSubscriptionLevel: (state, action: PayloadAction<UserSubscriptionLevelState['userSubscriptionLevel']>) => {
            state.userSubscriptionLevel = action.payload;
        },
    },
});

export const { setUserSubscriptionLevel } = userSubscriptionLevelSlice.actions;
export default userSubscriptionLevelSlice.reducer;