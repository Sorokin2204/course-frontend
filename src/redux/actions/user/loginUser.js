import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateLoginUser = {
  loginUser: { data: null, loading: false, error: null },
};

export const loginUser = createAsyncThunk('user/loginUser', async (data, { rejectWithValue, fulfillWithValue }) => {
  return await axios
    .post(`${process.env.REACT_APP_SERVER_API}/user/login`, data)
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      return rejectWithValue(res.response.data);
    });
});

export const reducerLoginUser = {
  [loginUser.pending]: (state) => {
    state.loginUser.loading = true;
  },
  [loginUser.fulfilled]: (state, action) => {
    state.loginUser.loading = false;
    state.loginUser.data = action.payload;
    state.loginUser.error = null;
  },
  [loginUser.rejected]: (state, action) => {
    state.loginUser.loading = false;
    state.loginUser.error = action.payload;
  },
};
