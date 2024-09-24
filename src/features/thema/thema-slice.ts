import { createSlice } from '@reduxjs/toolkit';
import { Theme } from '../../contexts/theme/types';

interface ThemaState {
  thema: Theme;
}

const initialState: ThemaState = {
  thema: 'light'
};

const themaSlice = createSlice({
  name: 'thema',
  initialState,
  reducers: {
    toDark: (state) => {
      state.thema = 'dark';
    },
    toLight: (state) => {
      state.thema = 'light';
    }
  }
});

export const { toDark, toLight } = themaSlice.actions;

export default themaSlice.reducer;
