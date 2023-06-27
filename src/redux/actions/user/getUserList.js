import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetUserList = {
  getUserList: { data: null, loading: false, error: null },
};

export const getUserList = createAsyncThunk('user/getUserList', async (data, { rejectWithValue, fulfillWithValue }) => {
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/user/list`)
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      return rejectWithValue(res.response.data);
    });
});

export const reducerGetUserList = {
  [getUserList.pending]: (state) => {
    state.getUserList.loading = true;
  },
  [getUserList.fulfilled]: (state, action) => {
    state.getUserList.loading = false;
    state.getUserList.data = action.payload;
    state.getUserList.error = null;
  },
  [getUserList.rejected]: (state, action) => {
    state.getUserList.loading = false;
    state.getUserList.error = action.payload;
  },
};
