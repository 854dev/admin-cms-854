import { useEffect, useState } from "react";
import api from "api/api_rtk";
import { ContentMeta, ContentType, ID } from "types/common";
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

  // CONTENT TYPE
  const { data: contentTypeListData } = api.useGetContentTypeListQuery({
    page: 1,
    limit: 50,
  });

  /* contentListFetch */
  useEffect(() => {
    if (contentTypeId) {
      const params = {
        page,
        limit,
        contentTypeId,
      };

      contentListFetch(params)
        .unwrap()
        .then(() => {
          return;
        });
    }

    return;
  }, [contentTypeId, page, limit]);

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
      findContentType: (id: ID) => {
        if (!contentTypeListData) return;

        return contentTypeListData?.data.find(
          (elem) => elem.contentTypeId === id
        );
      },
    },
    contentList: {
      data: contentListResponse?.data,
    },
  };
}

export default useInitFetch;
