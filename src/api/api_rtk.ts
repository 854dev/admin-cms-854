import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "features/store";
import * as common from "types/common";
import * as dto from "types/dto";

// Define a service using a base URL and expected endpoints
const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_BACKEND_URL,
    mode: "cors",
    prepareHeaders: (headers, baseQueryApi) => {
      // getState() 함수를 이용하여 리덕스 스토어에서 로그인 여부 등을 조회하여
      // 필요한 경우에만 JWT 헤더를 추가합니다.
      const state = baseQueryApi.getState() as RootState;
      const token = state.account.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["ContentType", "ContentBodySchema", "Content", "Tag"],

  endpoints: (builder) => ({
    postLogin: builder.mutation({
      query: (req: dto.LoginRequest) => ({
        method: "post",
        url: "auth/login",
        body: req,
      }),
      transformResponse: (response: common.LoginResponse) => response,
    }),

    postTokenValidate: builder.mutation({
      query: () => ({
        method: "post",
        url: `auth/validate-token/`,
      }),
      transformResponse: (response: common.TokenValidateResponse) => response,
    }),

    getContentList: builder.query({
      query: (req: dto.PagedRequest) => ({
        method: "get",
        url: "content",
        params: req,
      }),
      transformResponse: (response: common.PagedResponse<common.ContentMeta>) =>
        response,
      providesTags: (result, error, id) => ["Content"],
    }),

    getContentDetail: builder.query({
      query: (id: common.ID) => ({
        method: "get",
        url: `content/${id}`,
      }),
      transformResponse: (response: common.ContentDetail) => response,
    }),

    postContent: builder.mutation({
      query: (dto: dto.CreateContentDto) => ({
        method: "post",
        url: `content/`,
        body: dto,
      }),
      transformResponse: (response: common.MessageResponse) => response,
      invalidatesTags: ["Content"],
    }),

    putContent: builder.mutation({
      query: (dto: dto.UpdateContentDto) => ({
        method: "put",
        url: `content/${dto.contentId}`,
        body: dto,
      }),
      transformResponse: (response: common.MessageResponse) => response,
      invalidatesTags: ["Content"],
    }),

    deleteContent: builder.mutation({
      query: (id: common.ID) => ({
        method: "delete",
        url: `content/${id}`,
      }),
      transformResponse: (response: common.MessageResponse) => response,
      invalidatesTags: ["Content"],
    }),

    getContentTypeList: builder.query({
      query: (req: dto.PagedRequest) => ({
        method: "get",
        url: "content-type",
      }),
      transformResponse: (response: common.PagedResponse<common.ContentType>) =>
        response,
      providesTags: (result, error, id) => ["ContentType"],
    }),

    postContentType: builder.mutation({
      query: (body: dto.CreateContentTypeDto) => ({
        method: "post",
        url: "content-type",
        body,
      }),
      invalidatesTags: ["ContentType"],
    }),

    putContentType: builder.mutation({
      query: (id: common.ID) => ({
        method: "put",
        url: `content-type/${id}`,
      }),
      invalidatesTags: ["ContentType"],
    }),

    deleteContentType: builder.mutation({
      query: (id: common.ID) => ({
        method: "delete",
        url: `content-type/${id}`,
      }),
      invalidatesTags: ["ContentType"],
      transformResponse: (response: common.MessageResponse) => response,
    }),

    getContentTypeDetail: builder.query({
      query: (id: common.ID) => ({
        method: "get",
        url: `content-type/${id}`,
        transformResponse: (response: common.ContentTypeDetail) => response,
      }),
      providesTags: (result, error, id) => ["ContentBodySchema"],
    }),

    postBodySchema: builder.mutation({
      query: (body: dto.CreateBodySchemaDto) => ({
        method: "post",
        url: "content-body-schema",
        body,
      }),
      invalidatesTags: ["ContentBodySchema", "ContentType"],
      transformResponse: (response: common.MessageResponse) => response,
    }),

    deleteBodySchema: builder.mutation({
      query: (id: common.ID) => ({
        method: "delete",
        url: `content-body-schema/${id}`,
      }),
      transformResponse: (response: common.MessageResponse) => response,
      invalidatesTags: ["ContentBodySchema", "ContentType"],
    }),
  }),
});

export default api;
