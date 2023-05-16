import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetTypeOfSale = {
  getTypeOfSale: { data: null, loading: false, error: null },
};

export const getTypeOfSale = createAsyncThunk('user/getTypeOfSale', async (data, { rejectWithValue, fulfillWithValue }) => {
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/type-sale`)
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      return rejectWithValue(res.response.data);
    });
});

export const reducerGetTypeOfSale = {
  [getTypeOfSale.pending]: (state) => {
    state.getTypeOfSale.loading = true;
  },
  [getTypeOfSale.fulfilled]: (state, action) => {
    state.getTypeOfSale.loading = false;
    state.getTypeOfSale.data = action.payload;
    state.getTypeOfSale.error = null;
  },
  [getTypeOfSale.rejected]: (state, action) => {
    state.getTypeOfSale.loading = false;
    state.getTypeOfSale.error = action.payload;
  },
};
