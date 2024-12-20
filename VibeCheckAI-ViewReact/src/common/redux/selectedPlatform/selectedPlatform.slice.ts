import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PlatformType} from "Redux/selectedPlatform/SelectedPlatform.type";

interface SelectedPlatformState {
    platform: PlatformType;
}

const initialState: SelectedPlatformState = {
    platform: PlatformType.YOUTUBE,
};

const selectedPlatformSlice = createSlice({
    name: 'selectedPlatform',
    initialState,
    reducers: {
        setPlatform: (state, action: PayloadAction<SelectedPlatformState['platform']>) => {
            state.platform = action.payload;
        },
    },
});

export const { setPlatform } = selectedPlatformSlice.actions;
export default selectedPlatformSlice.reducer;