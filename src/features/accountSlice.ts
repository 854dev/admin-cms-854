import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "types/common";

interface UserState {
  token: string | null;
  user: User | null;
}

const initialState: UserState = {
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    resetUser: (state) => {
      state.token = "";
      state.user = null;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
