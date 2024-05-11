import { configureStore } from '@reduxjs/toolkit';
import settingAppReduce from './system/settingSys';
import userReduce from './app/user.slice';
import paymentReduce from './app/payment.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      settingApp: settingAppReduce,
      user: userReduce,
      payment: paymentReduce,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
