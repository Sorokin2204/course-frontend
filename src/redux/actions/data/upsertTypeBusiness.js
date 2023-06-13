import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUpsertTypeBusiness = {
  upsertTypeBusiness: { data: [], loading: false, error: null },
};

export const upsertTypeBusiness = createAsyncThunk('user/upsertTypeBusiness', async (data, { rejectWithValue, fulfillWithValue }) => {
  return await axios
    .post(`${process.env.REACT_APP_SERVER_API}/type-business`, data)
    .then((res) => {
      return fulfillWithValue(res.data);
    })
    .catch((res) => {
      return rejectWithValue(res.response.data);
    });
});

export const reducerUpsertTypeBusiness = {
  [upsertTypeBusiness.pending]: (state) => {
    state.upsertTypeBusiness.loading = true;
  },
  [upsertTypeBusiness.fulfilled]: (state, action) => {
    state.upsertTypeBusiness.loading = false;
    state.upsertTypeBusiness.data = action.payload;
    state.upsertTypeBusiness.error = null;
  },
  [upsertTypeBusiness.rejected]: (state, action) => {
    state.upsertTypeBusiness.loading = false;
    state.upsertTypeBusiness.error = action.payload;
  },
};
