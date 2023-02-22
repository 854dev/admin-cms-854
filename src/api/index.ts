import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  endpoints: (builder) => ({
    getContentList: builder.query({
      query: () => ({
        method: 'get',
        url: 'content',
      }),
    }),
  }),
});

export default api;
