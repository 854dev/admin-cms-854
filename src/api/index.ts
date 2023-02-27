import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateBodyFieldDto, CreateContentDto, UpdateContentDto } from 'types/common';

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

    putContent: builder.mutation({
      query: (dto: UpdateContentDto) => ({
        method: 'put',
        url: `content/${dto.contentId}`,
        body: dto,
      }),
    }),

    getContentTypeList: builder.query({
      query: () => ({
        method: 'get',
        url: 'content-type',
      }),
    }),

    getContentTypeDetail: builder.query({
      query: (id: string) => ({
        method: 'get',
        url: `content-type/${id}`,
      }),
    }),

    postContentType: builder.query({
      query: () => ({
        method: 'post',
        url: 'content-type',
      }),
    }),

    putContentType: builder.query({
      query: () => ({
        method: 'put',
        url: 'content-type',
      }),
    }),

    deleteContentType: builder.mutation({
      query: (id: string) => ({
        method: 'delete',
        url: `content-type/${id}`,
      }),
    }),

    postBodyField: builder.mutation({
      query: (body: CreateBodyFieldDto) => ({
        method: 'post',
        url: 'body-field/id',
        body,
      }),
    }),

    deleteBodyField: builder.mutation({
      query: (body: CreateBodyFieldDto) => ({
        method: 'delete',
        url: `body-field/${id}`,
        body,
      }),
    }),
  }),
});

export default api;
