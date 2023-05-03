import React, { useState, ChangeEventHandler, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "api/api_rtk";
import { ContentType, ID } from "types/common";
import { route } from "routes";
import { compileRouteParam } from "util/util";
import ContentCard from "components/ContentCard";
import useInitFetch from "hooks/useInitFetch";
import ContentTypeSelect from "./components/ContentTypeSelect";
import Pagination from "./components/Pagination";

function Content() {
  const {
    param: {
      contentTypeId,
      setcontentTypeId,
      page,
      setPage,
      limit,
      setLimit,
      setContentId,
    },
    contentTypeList,
    contentList,
  } = useInitFetch();

  const navigate = useNavigate();

  const [deleteContentTrigger, deleteContentResult] =
    api.useDeleteContentMutation();

  const onClickDeleteBadge = async (id: string) => {
    if (confirm("진짜 삭제?")) {
      alert(deleteContentTrigger(Number(id)).unwrap());
    }
  };

  const onClickEdit = (contentId: ID) => {
    navigate(
      `${compileRouteParam(route.contentDetail.absPath, {
        contentId: `${contentId}`,
      })}`
    );
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
        {contentList.data ? (
          <>
            <Pagination
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
            />
          </>
        ) : null}

        {contentList.data?.data &&
          contentList.data.data.map((elem) => {
            return (
              <>
                <ContentCard
                  key={elem.contentId}
                  {...elem}
                  onClickEdit={onClickEdit}
                  onClickDelete={() => {
                    onClickDeleteBadge(String(elem.contentId));
                  }}
                />
              </>
            );
          })}
      </>
    </div>
  );
}

export default Content;
