import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetResult = {
  getResult: { data: null, loading: false, error: null },
};

export const getResult = createAsyncThunk('user/getResult', async (userId, { rejectWithValue, fulfillWithValue }) => {
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/result`, {
      params: {
        userId,
      },
      headers: {
        'auth-token': localStorage.getItem('token'),
      },
    })
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      return rejectWithValue(res.response.data);
    });
});

export const reducerGetResult = {
  [getResult.pending]: (state) => {
    state.getResult.loading = true;
  },
  [getResult.fulfilled]: (state, action) => {
    state.getResult.loading = false;
    state.getResult.data = action.payload;
    state.getResult.error = null;
  },
  [getResult.rejected]: (state, action) => {
    state.getResult.loading = false;
    state.getResult.error = action.payload;
  },
};
