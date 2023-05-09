import { schemaType, ContentBody, ContentMeta, ID, ContentTag } from "./common";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface PagedRequest {
  page: number;
  limit: number;
  contentTypeId?: ID;
}

export interface CreateBodySchemaDto {
  contentTypeId: ID;
  schemaName: string;
  schemaType: schemaType;
}

export interface CreateContentTypeDto {
  contentTypeName: string;
}

export interface CreateContentDto extends ContentMeta {
  body: ContentBody;
  tags: TagDto[];
}

export interface UpdateContentDto extends CreateContentDto {
  contentId: ID;
}

export interface TagDto {
  name: string; // '하이' 'category:topic';
}
