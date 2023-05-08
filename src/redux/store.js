import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './slices/app.slice';
import { userReducer } from './slices/user.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});
