import { useEffect, useState } from "react";
import api from "api/api_rtk";
import { ID } from "types/common";
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

  /* contentTypeId */
  useEffect(() => {
    if (contentTypeId) {
      const params = {
        page,
        limit,
        contentTypeId,
      };

      contentListFetch(params)
        .unwrap()
        .then((res) => {
          console.log(res);
          return;
        });
    }

    return;
  }, [contentTypeId]);

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
      data: contentTypeListData,
    },
  };
}

export default useInitFetch;
