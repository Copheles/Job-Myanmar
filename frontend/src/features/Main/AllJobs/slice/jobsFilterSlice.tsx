import { createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
  page: number;
  pageSize: number;
  sort: string;
  status: string;
  jobType: string;
  sortOptions: string[];
  statusOptions: string[];
  jobTypeOptins: string[];
}

const initialState: InitialStateProps = {
  page: 1,
  pageSize: 6,
  sort: "all",
  status: "all",
  jobType: "all",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  statusOptions: ["interview", "declined", "pending", "closed"],
  jobTypeOptins: ["full-time", "part-time", "remote", "internship"],
};

const jobsFilterSlice = createSlice({
  name: "jobFilter",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = jobsFilterSlice.actions;

export default jobsFilterSlice.reducer;
