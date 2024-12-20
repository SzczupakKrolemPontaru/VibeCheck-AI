import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import selectedPlatformSlice from "Redux/selectedPlatform/selectedPlatform.slice";
import userSubscriptionLevelSlice from "Redux/userSubscriptionLevel/userSubscriptionLevel.slice";

const persistConfig = {
    key: 'root',
    storage,
};

const selectedPlatformReducer = persistReducer(persistConfig, selectedPlatformSlice);
const userSubscriptionLevelReducer = persistReducer(persistConfig, userSubscriptionLevelSlice);

const store = configureStore({
    reducer: {
        selectedPlatform: selectedPlatformReducer,
        userSubscriptionLevel: userSubscriptionLevelReducer
    },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;