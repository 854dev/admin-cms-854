import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ID } from 'types/common';
import * as dto from 'types/dto';

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
      query: (id: ID) => ({
        method: 'get',
        url: `content/${id}`,
      }),
    }),

    postContent: builder.mutation({
      query: (dto: dto.CreateContentDto) => ({
        method: 'post',
        url: `content/`,
        body: dto,
      }),
    }),

    putContent: builder.mutation({
      query: (dto: dto.UpdateContentDto) => ({
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
      query: (id: ID) => ({
        method: 'get',
        url: `content-type/${id}`,
      }),
    }),

    postContentType: builder.mutation({
      query: (body: dto.CreateContentTypeDto) => ({
        method: 'post',
        url: 'content-type',
        body,
      }),
    }),

    putContentType: builder.query({
      query: () => ({
        method: 'put',
        url: 'content-type',
      }),
    }),

    deleteContentType: builder.mutation({
      query: (id: ID) => ({
        method: 'delete',
        url: `content-type/${id}`,
      }),
    }),

    postBodySchema: builder.mutation({
      query: (body: dto.CreateBodySchemaDto) => ({
        method: 'post',
        url: 'content-body-schema',
        body,
      }),
    }),

    deleteBodySchema: builder.mutation({
      query: (id: ID) => ({
        method: 'delete',
        url: `content-body-schema/${id}`,
      }),
    }),
  }),
});

export default api;
