import { createSlice } from '@reduxjs/toolkit';
import { initStateGetNameBusiness, reducerGetNameBusiness } from '../actions/data/getNameBusiness';
import { initStateGetTypeBusiness, reducerGetTypeBusiness } from '../actions/data/getTypeBusiness';
import { initStateGetTypeOfSale, reducerGetTypeOfSale } from '../actions/data/getTypeOfSale';
import { initStateGetWhereSale, reducerGetWhereSale } from '../actions/data/getWhereSale';
export const initialState = {
  ...initStateGetNameBusiness,
  ...initStateGetTypeBusiness,
  ...initStateGetTypeOfSale,
  ...initStateGetWhereSale,
  auth: undefined,
  activeModal: '',
  activeChapter: 0,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveChapter(state, action) {
      state.activeChapter = action.payload;
    },
    setAuth(state, action) {
      state.auth = action.payload;
    },
    setActiveModal(state, action) {
      state.activeModal = action.payload;
    },
  },
  extraReducers: {
    ...reducerGetNameBusiness,
    ...reducerGetTypeBusiness,
    ...reducerGetTypeOfSale,
    ...reducerGetWhereSale,
  },
});
export const { setAuth, setActiveModal, setActiveChapter } = appSlice.actions;
export const appReducer = appSlice.reducer;
