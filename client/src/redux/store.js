import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import jobSlice from "./features/job/jobSlice";
import feedbackSlice from "./features/feedback/feedbackSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    feedback: feedbackSlice
  },
});
