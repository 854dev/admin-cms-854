export type contentMetaDate = string | null; // "2023-02-16T04:48:28.000Z",
export type contentMetaStatus = "draft" | "publish";
export type schemaType = "string" | "number" | "boolean" | "text";
export type ID = number;

export interface User {
  id: ID;
  username: string; // "aaaa@studio854.com";
  nickname?: string; // null;
  firstName?: string; // "master";
  lastName?: string; // "admin";
  role: string; // "admin";
  createdAt: string; // "2023-05-04T13:15:45.224Z";
  updatedAt: string; // "2023-05-04T13:15:45.224Z";
  deletedAt?: string; //null;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface MessageResponse {
  status?: number;
  message: string;
}

export interface PagedResponse<T = unknown> {
  data: T[];
  count: number;
  currentPage: number;
  totalPage: number;
}

export interface PagedInfinityResponse<T = unknown> {
  data: T[];
  hasNextPage: boolean;
}

export interface ContentMeta {
  contentId?: ID;
  contentTypeId?: ID;
  contentTypeName?: string;
  title: string;
  description?: string;
  creator?: string;
  createdAt?: contentMetaDate;
  updatedAt?: contentMetaDate;
  deletedAt?: contentMetaDate;
  status?: contentMetaStatus;
  tags?: ContentTag[];
}

export interface ContentTag {
  tagId: ID; // 1
  name: string; // '하이';
}

export interface ContentBody {
  [key: string]: string; // '<p>하이 헬로우</p>';
}

/** 프론트엔드 표시용 schemaName 추가된 ContentBody */
// export interface ContentBodyWithName extends ContentBody {
//   schemaName: string;
// }

export interface ContentType {
  contentTypeId: ID;
  contentTypeName: string;
  contentBodySchema: ContentBodySchema[];
}

export interface ContentBodySchema {
  schemaId: ID;
  contentTypeId: ID;
  schemaType: schemaType;
  schemaName: string;
}

export interface ContentTypeDetail extends ContentType {}

export interface ContentDetail extends ContentMeta {
  body: ContentBody;
}
