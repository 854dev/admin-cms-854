import { useEffect, useState } from "react";
import api from "api/api_rtk";
import { ContentDetail, ContentMeta, ContentType, ID } from "types/common";
function useInitFetch() {
  /* core parameter */
  const [contentTypeId, setcontentTypeId] = useState<ID>();
  const [contentId, setcontentId] = useState<ID>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  /* API */
  // contents
  const [contentListFetch, contentListResponse] =
    api.useLazyGetContentListQuery();

  const [contentDetailFetch, contentDetailResponse] =
    api.useLazyGetContentDetailQuery();

  // CONTENT TYPE
  const { data: contentTypeListData } = api.useGetContentTypeListQuery({
    page: 1,
    limit: 50,
  });

  /* contentListFetch */
  useEffect(() => {
    if (contentTypeId) {
      contentListFetch({
        page,
        limit,
        contentTypeId,
      })
        .unwrap()
        .then(() => {
          return;
        });
    }
    return;
  }, [contentTypeId, page, limit]);

  /* contentDetailFetch */
  useEffect(() => {
    if (contentTypeId) {
      contentDetailFetch({
        contentId,
      })
        .unwrap()
        .then(() => {
          return;
        });
    }
    return;
  }, [contentId]);

  return {
    param: {
      contentTypeId,
      setcontentTypeId,
      contentId,
      setcontentId,
      page,
      setPage,
      limit,
      setLimit,
    },
    contentTypeList: {
      data: contentTypeListData?.data,
      findContentType: (id?: ID) => {
        if (!contentTypeListData || !id) return;

        return contentTypeListData?.data.find(
          (elem) => elem.contentTypeId === id
        );
      },
    },
    contentList: {
      data: contentListResponse?.data,
    },
    contentDetail: {
      data: contentDetailResponse?.data,
      formDefault: {
        title: "",
        contentTypeId: -1,
        contentTypeName: "",
        creator: "",
        createdAt: "-",
        updatedAt: "-",
        deletedAt: "",
        status: "draft",
        body: {},
        tags: [],
      } as ContentDetail,
    },
  };
}

export default useInitFetch;
