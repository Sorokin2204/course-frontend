import { createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUpdateUser = {
  updateUser: { data: null, loading: false, error: null },
};

export const updateUser = createAsyncThunk('user/updateUser', async (data, { rejectWithValue, fulfillWithValue }) => {
  return await axios
    .post(`${process.env.REACT_APP_SERVER_API}/user/update`, data, {
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

export const reducerUpdateUser = {
  [updateUser.pending]: (state) => {
    state.updateUser.loading = true;
  },
  [updateUser.fulfilled]: (state, action) => {
    state.updateUser.loading = false;
    state.updateUser.data = action.payload;
    state.updateUser.error = null;
  },
  [updateUser.rejected]: (state, action) => {
    state.updateUser.loading = false;
    state.updateUser.error = action.payload;
  },
};
