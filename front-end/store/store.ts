import {combineReducers, configureStore,ThunkAction} from '@reduxjs/toolkit'
import {Action} from 'redux';
import searchSlice from '../features/searchSlice'
import {createWrapper} from 'next-redux-wrapper';
import authSlice from "../features/authSlice"

const rootReducer = combineReducers({
    search: searchSlice,
    auth: authSlice
});
function makeStore() {
    const store = configureStore({
        reducer: rootReducer
    });
    return store
}


export const store = makeStore();
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
export type AppDispatch = typeof store.dispatch

export const wrapper = createWrapper<AppStore>(makeStore);