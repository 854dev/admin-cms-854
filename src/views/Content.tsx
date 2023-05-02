import React, { useState, ChangeEventHandler, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "api/api_rtk";
import { ContentType } from "types/common";
import { route } from "routes";
import { routeParam } from "util/util";
import ContentCard from "components/ContentCard";
import useInitFetch from "hooks/useInitFetch";
import ContentTypeSelect from "./components/ContentTypeSelect";
import Pagination from "./components/Pagination";

function Content() {
  const {
    param: { contentTypeId, setcontentTypeId, page, setPage, limit, setLimit },
    contentTypeList,
    contentList,
  } = useInitFetch();

  const [deleteContentTrigger, deleteContentResult] =
    api.useDeleteContentMutation();

  const onClickDeleteBadge = async (id: string) => {
    if (confirm("진짜 삭제?")) {
      alert(deleteContentTrigger(Number(id)).unwrap());
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <section className="breadcrumb">
        <h1>Content</h1>
      </section>

      <div>
        <Link to={route.contentAdd.absPath} state={{ contentTypeId }}>
          <button className="">
            <span>게시글 작성</span>
          </button>
        </Link>

        <hr />

        {/* content type Select */}
        <ContentTypeSelect
          contentTypeId={contentTypeId}
          setcontentTypeId={setcontentTypeId}
          contentTypeList={contentTypeList.data ? contentTypeList.data : []}
        />
      </div>

      <>
        {contentList.data?.data &&
          contentList.data.data.map((elem) => {
            return (
              <>
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
              </>
            );
          })}

        {contentList.data?.hasNextPage ? (
          <>
            <Pagination
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
            />
          </>
        ) : null}
      </>
    </div>
  );
}

export default Content;
