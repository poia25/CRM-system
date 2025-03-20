import { configureStore } from "@reduxjs/toolkit"
import  authReducer  from "./authReducer"
import { useDispatch } from "react-redux";
import logger from 'redux-logger';


export const store = configureStore({
    reducer: {auth: authReducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
