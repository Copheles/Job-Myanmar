import { JOB_URL } from "@constants/constants";
import { apiSlice } from "@redux/apiSlice";

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: () => ({
        url: JOB_URL + "/",
      }),
    }),
  }),
});

export const { useGetAllJobsQuery } = jobsApiSlice;
