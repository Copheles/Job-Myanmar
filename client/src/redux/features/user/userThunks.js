import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showAlert, clearAlert } from "../feedback/feedbackSlice";
import { logoutUser, setUserInfoToNormalInUpdateFail } from "./userSlice";

const API_URL = "/api/v1/auth/";

export const loginUser = createAsyncThunk(
  "user/login",
  async (loginData, thunkAPI) => {
    try {
      const resposne = await axios.post(API_URL + "login", loginData);

      return resposne.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(showAlert({ status: "error", description: message }));
      return thunkAPI.rejectWithValue();
    } finally {
      setTimeout(() => {
        thunkAPI.dispatch(clearAlert());
      }, 3000);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (registerData, thunkAPI) => {
    try {
      const resposne = await axios.post(API_URL + "register", registerData);

      return resposne.data;
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(showAlert({ status: "error", description: message }));
      return thunkAPI.rejectWithValue();
    } finally {
      setTimeout(() => {
        thunkAPI.dispatch(clearAlert());
      }, 3000);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (updatedData, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const resposne = await axios.patch(API_URL + "updateUser", updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      thunkAPI.dispatch(
        showAlert({ status: "success", description: "User Updated" })
      );
      
      return resposne.data;
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(showAlert({ status: "error", description: message }));
      thunkAPI.dispatch(setUserInfoToNormalInUpdateFail(JSON.parse(localStorage.getItem('user'))))
      return thunkAPI.rejectWithValue();
    } finally {
      setTimeout(() => {
        thunkAPI.dispatch(clearAlert());
      }, 3000);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteAccount",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const resposne = await axios.delete(API_URL + "deleteUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      thunkAPI.dispatch(logoutUser());

      return resposne.data;
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(showAlert({ status: "error", description: message }));
      setTimeout(() => {
        thunkAPI.dispatch(clearAlert());
      }, 3000);
      return thunkAPI.rejectWithValue();
    } finally {
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (changePasswordData, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const resposne = await axios.patch(API_URL + "changePassword", changePasswordData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      thunkAPI.dispatch(
        showAlert({ status: "success", description: "Password Updated" })
      );
      return resposne.data;
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(showAlert({ status: "error", description: message }));
      return thunkAPI.rejectWithValue();
    } finally {
      setTimeout(() => {
        thunkAPI.dispatch(clearAlert());
      }, 3000);
    }
  }
);
