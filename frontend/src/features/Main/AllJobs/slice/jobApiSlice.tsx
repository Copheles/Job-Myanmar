import { JOB_URL } from "@constants/constants";
import { socketInstance } from "@hooks/useSocket";
import { getAllJobQuery, JobResponse } from "@interface/job/job";
import { apiSlice } from "@redux/apiSlice";

export const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query<JobResponse, getAllJobQuery>({
      query: ({ search = "", status, jobType, sort, page }) => ({
        url:
          JOB_URL +
          "?" +
          `status=${status}&jobType=${jobType}&search=${search}&sort=${sort}&limit=${6}&page=${page}`,
      }),
      providesTags: ["Jobs"],
    }),
    createJob: builder.mutation({
      query: (data) => ({
        url: JOB_URL + "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    deleteJob: builder.mutation({
      query: (jobId) => ({
        url: JOB_URL + `/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
    updateJob: builder.mutation({
      query: ({ jobId, data }) => ({
        url: JOB_URL + `/${jobId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_, __, { jobId }) => [{ type: "Jobs", id: jobId }],
    }),
    getSingleJob: builder.query({
      query: (jobId) => ({
        url: JOB_URL + `/${jobId}`,
      }),
      async onCacheEntryAdded(
        args,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          console.log("Iniital jobId, ", args);
          await cacheDataLoaded;

          socketInstance?.on("comment update", (data: any) => {
            console.log("Recieved comment update", data);

            if (data.jobId === args) {
              updateCachedData((draft) => {
                console.log("Cached args", draft);
                draft.comments = data.comments;
              });
            }
          });

          socketInstance?.on("comment delete", (data: any) => {
            console.log("Recieved comment delete", data);

            if (data.jobId === args) {
              updateCachedData((draft) => {
                console.log("Cached args", draft);
                draft.comments = data.comments;
              });
            }
          });

          socketInstance?.on("comment create", (data: any) => {
            console.log("Recieved comment create ", data);

            if (data.jobId === args) {
              updateCachedData((draft) => {
                console.log("Cached args ", draft);
                draft.comments = data.comments;
              });
            }
          });

          await cacheEntryRemoved;
        } finally {
          socketInstance?.off("comment create");
        }
      },
      providesTags: (_, __, {jobId}) => [{ type: "Jobs", id: jobId }],
    }),
    getRelatedJobs: builder.query({
      query: (jobId) => ({
        url: JOB_URL + `/${jobId}/relatedJobs`,
      }),
    }),
    getStats: builder.query({
      query: () => ({
        url: JOB_URL + `/stats`,
      }),
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useCreateJobMutation,
  useGetSingleJobQuery,
  useGetRelatedJobsQuery,
  useDeleteJobMutation,
  useUpdateJobMutation,
  useGetStatsQuery,
} = jobsApiSlice;
