import React, { useState, ChangeEventHandler, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "api/api_rtk";
import { ContentType } from "types/common";
import { route } from "routes";
import { routeParam } from "util/util";
import ContentCard from "components/ContentCard";

function Content() {
  const [contentType, setcontentType] = useState<number>();

  const { data, isFetching } = api.useGetContentListQuery(
    {
      page: 1,
      limit: 10,
      contentTypeId: contentType ?? -1,
    },
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );

  const [deleteContentTrigger, deleteContentResult] =
    api.useDeleteContentMutation();

  const {
    data: contentTypeListData,
    error: contentTypeListError,
    isFetching: contentTypeListIsFetching,
    isSuccess: contentTypeListSuccess,
    refetch: contentTypeListRefetch,
  } = api.useGetContentTypeListQuery({
    page: 1,
    limit: 50,
  });

  const onClickIdBadge = (id: string) => {
    alert(id);
  };

  const onClickDeleteBadge = async (id: string) => {
    if (confirm("진짜 삭제?")) {
      alert(deleteContentTrigger(Number(id)).unwrap());
    }
  };

  const onChangeContentType: ChangeEventHandler<HTMLSelectElement> = async (
    e
  ) => {
    setcontentType(Number(e.currentTarget.value));
  };

  useEffect(() => {
    if (contentTypeListSuccess) {
      if (contentTypeListData.data.length > 0) {
        const firstId = contentTypeListData.data[0].contentTypeId;
        setcontentType(firstId);
      }
    }
  }, [contentTypeListSuccess, contentTypeListIsFetching]);

  return (
    <div>
      {/* Breadcrumb */}
      <section className="breadcrumb">
        <h1>Content</h1>
      </section>

      <div>
        <Link
          to={route.contentAdd.absPath}
          state={{ contentTypeId: contentType }}
        >
          <button className="">
            <span>게시글 작성</span>
          </button>
        </Link>

        {/* content type Select */}
        <div className="mb-5 w-48">
          <div className="mb-2 flex justify-between">
            <p>콘텐츠 타입 이름</p>
          </div>

          <select onChange={onChangeContentType}>
            {contentTypeListData ? (
              <>
                {contentTypeListData.data.map((elem: ContentType) => (
                  <option key={elem.contentTypeId} value={elem.contentTypeId}>
                    {elem.contentTypeName}
                  </option>
                ))}
              </>
            ) : null}
          </select>
        </div>
      </div>

      {data ? (
        <>
          {data.data.map((elem) => {
            return (
              <ContentCard
                key={elem.contentId}
                {...elem}
                linkTo={`${routeParam(route.contentDetail.absPath, {
                  contentId: String(elem.contentId) ?? "",
                })}`}
                onClickDelete={() => {
                  onClickDeleteBadge(String(elem.contentId));
                }}
              />
            );
          })}
        </>
      ) : null}
    </div>
  );
}

export default Content;
