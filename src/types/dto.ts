import { bodyFieldType, ContentBody, ContentMeta, ID } from './common';

export interface PagedRequest {
  page: number;
  limit: number;
}

export interface CreateBodySchemaDto {
  contentTypeId: ID;
  schemaName: string;
  schemaType: bodyFieldType;
}

export interface CreateContentTypeDto {
  contentTypeName: string;
}

export interface CreateContentDto extends ContentMeta {
  body: ContentBody[];
}

export interface UpdateContentDto extends CreateContentDto {
  contentId: ID;
}
