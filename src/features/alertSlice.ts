import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AlertState {
  title: string;
  color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  outlined: boolean;
  dismissable: boolean;
  children: string;
}

const initialState: AlertState = {
  title: '수정완료',
  color: 'primary',
  outlined: false,
  dismissable: false,
  children: '헤헤 안녕',
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<AlertState>) => {
      state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTitle } = alertSlice.actions;

export default alertSlice.reducer;
