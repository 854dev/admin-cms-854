import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as common from 'types/common';
import * as dto from 'types/dto';

// Define a service using a base URL and expected endpoints
const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_REACT_APP_BACKEND_URL, mode: 'cors' }),
  tagTypes: ['ContentType', 'ContentBodySchema', 'Content', 'Tag'],
  endpoints: (builder) => ({
    getContentList: builder.query({
      query: (req: dto.PagedRequest) => ({
        method: 'get',
        url: 'content',
        params: req,
      }),
      transformResponse: (response: common.PagedResponse<common.ContentMeta>) => response,
      providesTags: (result, error, id) => ['Content'],
    }),

    getContentDetail: builder.query({
      query: (id: common.ID) => ({
        method: 'get',
        url: `content/${id}`,
      }),
      transformResponse: (response: common.ContentDetail) => response,
    }),

    postContent: builder.mutation({
      query: (dto: dto.CreateContentDto) => ({
        method: 'post',
        url: `content/`,
        body: dto,
      }),
      transformResponse: (response: common.MessageResponse) => response,
      invalidatesTags: ['Content'],
    }),

    putContent: builder.mutation({
      query: (dto: dto.UpdateContentDto) => ({
        method: 'put',
        url: `content/${dto.contentId}`,
        body: dto,
      }),
      transformResponse: (response: common.MessageResponse) => response,
      invalidatesTags: ['Content'],
    }),

    deleteContent: builder.mutation({
      query: (id: common.ID) => ({
        method: 'delete',
        url: `content/${id}`,
      }),
      transformResponse: (response: common.MessageResponse) => response,
      invalidatesTags: ['Content'],
    }),

    getContentTypeList: builder.query({
      query: (req: dto.PagedRequest) => ({
        method: 'get',
        url: 'content-type',
      }),
      transformResponse: (response: common.PagedResponse<common.ContentType>) => response,
      providesTags: (result, error, id) => ['ContentType'],
    }),

    postContentType: builder.mutation({
      query: (body: dto.CreateContentTypeDto) => ({
        method: 'post',
        url: 'content-type',
        body,
      }),
      invalidatesTags: ['ContentType'],
    }),

    putContentType: builder.mutation({
      query: (id: common.ID) => ({
        method: 'put',
        url: `content-type/${id}`,
      }),
      invalidatesTags: ['ContentType'],
    }),

    deleteContentType: builder.mutation({
      query: (id: common.ID) => ({
        method: 'delete',
        url: `content-type/${id}`,
      }),
      invalidatesTags: ['ContentType'],
      transformResponse: (response: common.MessageResponse) => response,
    }),

    getContentTypeDetail: builder.query({
      query: (id: common.ID) => ({
        method: 'get',
        url: `content-type/${id}`,
        transformResponse: (response: common.ContentTypeDetail) => response,
      }),
      providesTags: (result, error, id) => ['ContentBodySchema'],
    }),

    postBodySchema: builder.mutation({
      query: (body: dto.CreateBodySchemaDto) => ({
        method: 'post',
        url: 'content-body-schema',
        body,
      }),
      invalidatesTags: ['ContentBodySchema', 'ContentType'],
      transformResponse: (response: common.MessageResponse) => response,
    }),

    deleteBodySchema: builder.mutation({
      query: (id: common.ID) => ({
        method: 'delete',
        url: `content-body-schema/${id}`,
      }),
      transformResponse: (response: common.MessageResponse) => response,
      invalidatesTags: ['ContentBodySchema', 'ContentType'],
    }),

    postTag: builder.mutation({
      query: (body: dto.CreateTagDto) => ({
        method: 'post',
        url: `tag`,
        body,
      }),
      invalidatesTags: ['Tag'],
    }),

    getTag: builder.query({
      query: () => ({
        method: 'get',
        url: `tag`,
        transformResponse: (response: common.ContentTag[]) => response,
      }),
      providesTags: (result, error, id) => ['Tag'],
    }),

    putTag: builder.mutation({
      query: (body: dto.UpdateTagDto) => ({
        method: 'put',
        url: `tag/${body.tagId}`,
        body,
      }),
      invalidatesTags: ['Tag'],
    }),

    deleteTag: builder.mutation({
      query: (id: common.ID) => ({
        method: 'delete',
        url: `tag/${id}`,
      }),
      invalidatesTags: ['Tag'],
    }),
  }),
});

export default api;
