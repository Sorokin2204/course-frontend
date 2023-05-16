import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetTypeBusiness = {
  getTypeBusiness: { data: null, loading: false, error: null },
};

export const getTypeBusiness = createAsyncThunk('user/getTypeBusiness', async (data, { rejectWithValue, fulfillWithValue }) => {
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/type-business`)
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      return rejectWithValue(res.response.data);
    });
});

export const reducerGetTypeBusiness = {
  [getTypeBusiness.pending]: (state) => {
    state.getTypeBusiness.loading = true;
  },
  [getTypeBusiness.fulfilled]: (state, action) => {
    state.getTypeBusiness.loading = false;
    state.getTypeBusiness.data = action.payload;
    state.getTypeBusiness.error = null;
  },
  [getTypeBusiness.rejected]: (state, action) => {
    state.getTypeBusiness.loading = false;
    state.getTypeBusiness.error = action.payload;
  },
};
