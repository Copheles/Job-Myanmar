import { BASE_URL } from "@constants/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ['Jobs']
});
