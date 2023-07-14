import {combineReducers, configureStore} from '@reduxjs/toolkit'
import searchSlice from '../features/searchSlice'
import authSlice from "../features/authSlice"

const rootReducer = combineReducers({
    search: searchSlice,
    auth: authSlice
});
const store = configureStore({
    reducer: rootReducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch