import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateContentDto, UpdateContentDto } from 'types/common';

// Define a service using a base URL and expected endpoints
const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080', mode: 'cors' }),

  endpoints: (builder) => ({
    getContentList: builder.query({
      query: () => ({
        method: 'get',
        url: 'content',
      }),
    }),

    getContentDetail: builder.query({
      query: (id: number) => ({
        method: 'get',
        url: `content/${id}`,
      }),
    }),

    postContent: builder.mutation({
      query: (dto: CreateContentDto) => ({
        method: 'post',
        url: `content/`,
        body: dto,
      }),
    }),

    patchContent: builder.mutation({
      query: (dto: UpdateContentDto) => ({
        method: 'put',
        url: `content/${dto.contentId}`,
        body: dto,
      }),
    }),
  }),
});

export default api;
