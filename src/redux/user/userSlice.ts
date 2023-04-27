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

  };
}

const initialState: UserState = {
  user: {
    name: "",
    phone: "",
    email: "",
    token: "",
    id:0,
    username:'',
    isLoggedIn: false,
    
  },
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
