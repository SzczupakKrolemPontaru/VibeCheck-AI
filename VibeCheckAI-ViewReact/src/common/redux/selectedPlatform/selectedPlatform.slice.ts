import {PlatformType} from 'Redux/selectedPlatform/SelectedPlatform.type';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
        setPlatform: (state, action: PayloadAction<{platform: PlatformType}>) => {
            state.platform = action.payload.platform;
        },
    },
});

export const { setPlatform } = selectedPlatformSlice.actions;
export default selectedPlatformSlice.reducer;