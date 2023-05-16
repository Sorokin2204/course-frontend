import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetWhereSale = {
  getWhereSale: { data: null, loading: false, error: null },
};

export const getWhereSale = createAsyncThunk('user/getWhereSale', async (data, { rejectWithValue, fulfillWithValue }) => {
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/where-sale`)
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      return rejectWithValue(res.response.data);
    });
});

export const reducerGetWhereSale = {
  [getWhereSale.pending]: (state) => {
    state.getWhereSale.loading = true;
  },
  [getWhereSale.fulfilled]: (state, action) => {
    state.getWhereSale.loading = false;
    state.getWhereSale.data = action.payload;
    state.getWhereSale.error = null;
  },
  [getWhereSale.rejected]: (state, action) => {
    state.getWhereSale.loading = false;
    state.getWhereSale.error = action.payload;
  },
};
