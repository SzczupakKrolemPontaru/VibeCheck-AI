import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import selectedPlatformSlice from 'Redux/selectedPlatform/selectedPlatform.slice';
import userSlice from 'Redux/user/user.slice';
import {configureStore} from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    storage,
};

const selectedPlatformReducer = persistReducer(persistConfig, selectedPlatformSlice);
const userSliceReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
    reducer: {
        selectedPlatform: selectedPlatformReducer,
        user: userSliceReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;