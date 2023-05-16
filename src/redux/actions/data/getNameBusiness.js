import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetNameBusiness = {
  getNameBusiness: { data: null, loading: false, error: null },
};

export const getNameBusiness = createAsyncThunk('user/getNameBusiness', async (data, { rejectWithValue, fulfillWithValue }) => {
  return await axios
    .get(`${process.env.REACT_APP_SERVER_API}/name-business`)
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      return rejectWithValue(res.response.data);
    });
});

export const reducerGetNameBusiness = {
  [getNameBusiness.pending]: (state) => {
    state.getNameBusiness.loading = true;
  },
  [getNameBusiness.fulfilled]: (state, action) => {
    state.getNameBusiness.loading = false;
    state.getNameBusiness.data = action.payload;
    state.getNameBusiness.error = null;
  },
  [getNameBusiness.rejected]: (state, action) => {
    state.getNameBusiness.loading = false;
    state.getNameBusiness.error = action.payload;
  },
};
