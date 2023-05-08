import { createSlice } from '@reduxjs/toolkit';
import { initStateCreateUser, reducerCreateUser } from '../actions/user/createUser';
import { initStateLoginUser, reducerLoginUser } from '../actions/user/loginUser';
import { initStateAuthUser, reducerAuthUser } from '../actions/user/authUser';
import { initStateUpdateUser, reducerUpdateUser } from '../actions/user/updateUser';

export const initialState = {
  ...initStateCreateUser,
  ...initStateLoginUser,
  ...initStateAuthUser,
  ...initStateUpdateUser,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetCreateUser(state) {
      state.createUser = initStateCreateUser.createUser;
    },
    resetLoginUser(state) {
      state.loginUser = initStateLoginUser.loginUser;
    },
    resetUpdateUser(state) {
      state.updateUser = initStateUpdateUser.updateUser;
    },
  },
  extraReducers: {
    ...reducerCreateUser,
    ...reducerLoginUser,
    ...reducerAuthUser,
    ...reducerUpdateUser,
  },
});
export const { resetCreateUser, resetLoginUser, resetUpdateUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
