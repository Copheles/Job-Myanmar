import { AUTH_URL } from "@constants/constants";
import { apiSlice } from "@redux/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: AUTH_URL + "/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: AUTH_URL + "/register",
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: AUTH_URL + "/getMe",
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: AUTH_URL + "/updateUser",
        method: "PATCH",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: AUTH_URL + "/changePassword",
        method: "PATCH",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: AUTH_URL + "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useChangePasswordMutation,
  useUpdateProfileMutation,
} = authApiSlice;
