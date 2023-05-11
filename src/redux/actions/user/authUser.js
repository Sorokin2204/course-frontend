import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateAuthUser = {
  authUser: { data: null, loading: false, error: null },
};

export const authUser = createAsyncThunk('user/authUser', async (data, { rejectWithValue, fulfillWithValue }) => {
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/user/auth`, { headers: { 'auth-token': localStorage.getItem('token') } })
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      return rejectWithValue(res.response.data);
    });
});

export const reducerAuthUser = {
  [authUser.pending]: (state) => {
    state.authUser.loading = true;
    state.authUser.error = null;
  },
  [authUser.fulfilled]: (state, action) => {
    state.authUser.loading = false;
    state.authUser.data = action.payload;
    state.authUser.error = null;
  },
  [authUser.rejected]: (state, action) => {
    state.authUser.data = null;
    state.authUser.loading = false;
    state.authUser.error = action.payload;
  },
};
