import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, updateUser } from "./userThunks";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
  mode: localStorage.getItem("chakra-ui-color-mode"),
  user: user ? JSON.parse(user) : null,
  token: token || null,
  isLoading: false,
};

const addUserToLocalStorage = ({ user, token }) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

const removeUserToLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleChangeInputUser: (state, { payload }) => {
      const { name, value } = payload;
      state.user[name] = value;
    },
    changeMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    logoutUser: (state) => {
      state.user = null;
      removeUserToLocalStorage();
    },
  },
  extraReducers(builder) {
    //Login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      const { token, user } = payload;
      state.user = user;
      state.token = token
      addUserToLocalStorage({ user, token });
      state.isLoading = false;
    });

    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.isLoading = false;
    });

    // register
    builder.addCase(registerUser.pending, (state) => {});
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      const { token, user } = payload;
      state.user = user;
      state.token = token
      addUserToLocalStorage({ user, token });
    });

    builder.addCase(registerUser.rejected, (state, { payload }) => {});

    // update user
    builder.addCase(updateUser.pending, (state) => {});
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      const { token, user } = payload;
      state.user = user;
      state.token = token
      addUserToLocalStorage({ user, token });
    });

    builder.addCase(updateUser.rejected, (state, { payload }) => {});
  },
});

export const { changeMode, logoutUser, handleChangeInputUser } =
  userSlice.actions;

export default userSlice.reducer;
