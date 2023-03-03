export type contentMetaDate = string | null; // "2023-02-16T04:48:28.000Z",
export type contentMetaStatus = 'draft' | 'publish';
export type bodyFieldType = 'string' | 'number' | 'boolean' | 'text';
export type ID = number;

export interface PagedResponse<T = unknown> {
  data: T[];
  hasNextPage: boolean;
}

export interface ContentMeta {
  contentTypeId: ID;
  contentTypeName: string;
  title: string;
  creator: string;
  createdAt: contentMetaDate;
  updatedAt: contentMetaDate;
  deletedAt: contentMetaDate;
  status: contentMetaStatus;
}

export interface ContentBody {
  bodyFieldId: ID; // 1
  bodyFieldName: string; // 'article_main';
  bodyFieldValue: string; // '<p>하이 헬로우</p>';
}

export interface ContentBase<T = any> extends ContentMeta {}

export interface ContentType {
  contentTypeId: ID;
  contentTypeName: string;
}

export interface ContentBodySchema {
  id: ID;
  contentTypeId: ID;
  fieldType: bodyFieldType;
  fieldName: string;
}

export interface ContentTypeDetail extends ContentType {
  bodySchema: ContentBodySchema[];
}
