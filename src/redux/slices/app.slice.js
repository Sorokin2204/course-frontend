import { createSlice } from '@reduxjs/toolkit';
import { initStateGetNameBusiness, reducerGetNameBusiness } from '../actions/data/getNameBusiness';
import { initStateGetTypeBusiness, reducerGetTypeBusiness } from '../actions/data/getTypeBusiness';
import { initStateGetTypeOfSale, reducerGetTypeOfSale } from '../actions/data/getTypeOfSale';
import { initStateGetWhereSale, reducerGetWhereSale } from '../actions/data/getWhereSale';
import { initStateUpsertTypeBusiness, reducerUpsertTypeBusiness } from '../actions/data/upsertTypeBusiness';
export const initialState = {
  ...initStateGetNameBusiness,
  ...initStateGetTypeBusiness,
  ...initStateGetTypeOfSale,
  ...initStateGetWhereSale,
  ...initStateUpsertTypeBusiness,
  auth: undefined,
  activeModal: '',
  activeChapter: 0,
  settingStep: 0,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveChapter(state, action) {
      state.activeChapter = action.payload;
    },
    setSettingStep(state, action) {
      state.settingStep = action.payload;
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
    ...reducerUpsertTypeBusiness,
  },
});
export const { setAuth, setActiveModal, setActiveChapter, setSettingStep } = appSlice.actions;
export const appReducer = appSlice.reducer;
