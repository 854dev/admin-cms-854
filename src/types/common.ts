export type contentMetaDate = string | null; // "2023-02-16T04:48:28.000Z",
export type contentMetaStatus = 'draft' | 'publish';

export interface ContentMeta {
  title: string;
  creator: string;
  createdAt: contentMetaDate;
  updatedAt: contentMetaDate;
  deletedAt: contentMetaDate;
  status: contentMetaStatus;
}

export interface ContentBody {
  contentTypeId: 1;
  title: '테스트';
  creator: 'Sangbong An';
  status: 'draft';
  body: [
    {
      bodyFieldId: 1;
      bodyFieldName: 'article_main';
      bodyFieldValue: '<p>하이 헬로우</p>';
    }
  ];
}

export interface ContentBase<T = any> extends ContentMeta {}
