import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUpsertResult = {
  upsertResult: { data: null, loading: false, error: null },
};

export const upsertResult = createAsyncThunk('user/upsertResult', async (data, { rejectWithValue, fulfillWithValue }) => {
  return await axios
    .post(`${process.env.REACT_APP_SERVER_API}/result`, data, {
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

export const reducerUpsertResult = {
  [upsertResult.pending]: (state) => {
    state.upsertResult.loading = true;
  },
  [upsertResult.fulfilled]: (state, action) => {
    state.upsertResult.loading = false;
    state.upsertResult.data = action.payload;
    state.upsertResult.error = null;
  },
  [upsertResult.rejected]: (state, action) => {
    state.upsertResult.loading = false;
    state.upsertResult.error = action.payload;
  },
};
