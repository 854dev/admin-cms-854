export type contentMetaDate = string | null; // "2023-02-16T04:48:28.000Z",
export type contentMetaStatus = 'draft' | 'publish';
export type bodyFieldType = 'string' | 'number' | 'boolean' | 'text';
export type ID = number;

export interface ContentMeta {
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

export interface CreateContentDto extends ContentMeta {
  body: ContentBody[];
}

export interface UpdateContentDto extends CreateContentDto {
  contentId: ID;
}

export interface ContentType {
  id: ID;
  name: string;
}

export interface CreateContentTypeDto {
  name: string;
}

export interface ContentBodyField {
  id: ID;
  contentTypeId: ID;
  fieldTypeId: ID;
  fieldName: string;
  fieldTypeName: bodyFieldType;
}

export interface ContentTypeDetail extends ContentType {
  bodyField: ContentBodyField[];
}

export interface CreateBodyFieldDto {
  contentTypeId: ID;
  fieldTypeId: ID;
  fieldName: string;
  fieldTypeName: bodyFieldType;
}
