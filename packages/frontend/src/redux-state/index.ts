import { createWrapper, Context } from 'next-redux-wrapper'
import reducer from './reducer'
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

const isDev = process.env.NODE_ENV !== 'production'
const blackListedAction = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [...blackListedAction]
      }
    }),
  devTools: process.env.NODE_ENV !== "production"
});


const makeStore = () => store

export type AppState = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>
export const wrapper = createWrapper<AppState>(makeStore);

export default store;