import { useEffect, useState } from "react";
import api from "api/api_rtk";
import { ContentDetail, ID } from "types/common";

/**
 * useInitFetch
 * @param enabled : 전체 페칭을 처리할지 말지 결정
 * @returns
 */
function useInitFetch(disabled?: boolean) {
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
  const [contentTypeFetch, contentTypeResponse] =
    api.useLazyGetContentTypeListQuery();

  /* contentTypeFetch : 이후 API 호출 전 호출 */
  useEffect(() => {
    if (!disabled) {
      contentTypeFetch({
        page: 1,
        limit: 50,
      })
        .unwrap()
        .then(() => {
          return;
        });
      return;
    }
  }, []);

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
    if (contentId) {
      contentDetailFetch(contentId)
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
      data: contentTypeResponse?.data?.data,
      findContentType: (id?: ID) => {
        if (!contentTypeResponse.data || !id) return;
        return contentTypeResponse.data.data.find(
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
