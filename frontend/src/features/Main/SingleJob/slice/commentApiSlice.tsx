import { COMMENT_URL } from "@constants/constants";
import { apiSlice } from "@redux/apiSlice";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postComment: builder.mutation({
      query: (data) => ({
        url: COMMENT_URL + "/",
        method: "POST",
        body: data,
      }),
    }),
    deleteComment: builder.mutation({
      query: (data) => ({
        url: COMMENT_URL + "/" + data.id,
        method: "DELETE",
        body: { jobId: data.jobId },
      }),
    }),
    updateComment: builder.mutation({
      query: (data) => ({
        url: COMMENT_URL + "/" + data.id,
        method: "PATCH",
        body: { content: data.content, jobId: data.jobId },
      }),
    }),
  }),
});

export const {
  usePostCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = commentApiSlice;
