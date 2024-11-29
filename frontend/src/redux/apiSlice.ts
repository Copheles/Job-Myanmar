import { BASE_URL } from "@constants/constants";
import { logout } from "@features/Auth/slice/authSlice";
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";

// Configure the base query with the API base URL and credentials
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include", // Ensure cookies are included with requests
});

// Add authentication handling to the base query
const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs, // Args type (string URL or object with { url, method, body })
  unknown, // Result type
  FetchBaseQueryError // Error type
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Dispatch logout on 401 Unauthorized response
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }

  return result;
};

// Define the API slice
export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}), // Extend this to define endpoints
  tagTypes: ["Jobs"], // Define tag types for caching and invalidation
});
