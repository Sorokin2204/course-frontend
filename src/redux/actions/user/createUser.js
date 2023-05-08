import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateCreateUser = {
  createUser: { data: null, loading: false, error: null },
};

export const createUser = createAsyncThunk('user/createUser', async (data, { rejectWithValue, fulfillWithValue }) => {
  return await axios
    .post(`${process.env.REACT_APP_SERVER_API}/user/register`, data)
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      return rejectWithValue(res.response.data);
    });
});

export const reducerCreateUser = {
  [createUser.pending]: (state) => {
    state.createUser.loading = true;
  },
  [createUser.fulfilled]: (state, action) => {
    state.createUser.loading = false;
    state.createUser.data = action.payload;
    state.createUser.error = null;
  },
  [createUser.rejected]: (state, action) => {
    state.createUser.loading = false;
    state.createUser.error = action.payload;
  },
};
