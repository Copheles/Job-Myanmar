import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowAlert: false,
  alertDetails: {},
  isReplyAlert: false,
  replyAlertDetails: {},
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    showAlert: (state, { payload }) => {
      state.isShowAlert = true;
      state.alertDetails = { ...payload };
    },
    showReplyAlert: (state, { payload }) => {
      state.isReplyAlert = true;
      state.replyAlertDetails = { ...payload };
    },
    clearAlert: (state) => {
      state.isShowAlert = false;
      state.alertDetails = {};
      state.isReplyAlert = false;
      state.replyAlertDetails = {};
    },
  },
});

export const { showAlert, clearAlert, showReplyAlert } = feedbackSlice.actions;

export default feedbackSlice.reducer;
