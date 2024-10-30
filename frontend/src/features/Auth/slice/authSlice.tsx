import { createSlice } from "@reduxjs/toolkit";

interface InititalStateProps {
  userInfo: {
    id: string;
    name: string;
    email: string;
    location: string;
  } | null;
}

const initialState: InititalStateProps = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCrendials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      console.log(state);
      localStorage.clear();
    },
  },
});

export const { setCrendials, logout } = authSlice.actions;

export default authSlice.reducer;
