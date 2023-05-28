import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: {
    name: string;
    phone: string;
    username: string;
    id: number;
    email: string;
    token: string;
    isLoggedIn: boolean;
    rcNumber: string;
    inCharge: string;
    address: string;
  };
  jv?: any[];
  unread?: number;
}

const initialState: UserState = {
  user: {
    name: "",
    phone: "",
    email: "",
    token: "",
    id: 0,
    username: "",
    isLoggedIn: false,
    rcNumber: "",
    inCharge: "",
    address: "",
  },
  jv: [],
  unread: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
    },
    setJv: (state, action) => {
      state.jv = action.payload;
    },
    setUnread: (state, action) => {
      state.unread = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setJv, setUnread } = userSlice.actions;

export default userSlice.reducer;
