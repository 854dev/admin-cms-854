import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SmileBeamIcon } from 'react-line-awesome';

export interface AlertState {
  title: string;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  outlined?: boolean;
  dismissable: boolean;
  children: string;
}

const initialState: { alert: AlertState[] } = { alert: [] };

const defaultAlert: AlertState = {
  title: '',
  color: 'primary',
  outlined: false,
  dismissable: false,
  children: '',
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertState>) => {
      let s: { alert: AlertState[] } = state;
      const newAlert = {
        ...defaultAlert,
        ...action.payload,
      };

      s = { alert: [...s.alert, newAlert] };
      return s;
    },
    popAlert: (state) => {
      let s: { alert: AlertState[] } = state;
      const newAlert = [...s.alert];
      newAlert.pop();
      s.alert = newAlert;
      return s;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAlert, popAlert } = alertSlice.actions;

export default alertSlice.reducer;
