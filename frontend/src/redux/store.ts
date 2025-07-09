import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import authSliceReducer from "@features/Auth/slice/authSlice";
import languageReducer from "@features/Landing/slice/languageSlice";
import jobsFilterReducer from "@features/Main/AllJobs/slice/jobsFilterSlice";
import modalSliceReducer from "@components/modal/modalSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    language: languageReducer,
    modal: modalSliceReducer,
    jobFilter: jobsFilterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
