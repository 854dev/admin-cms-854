import React from "react";

import { parseDate } from "util/util";
import { ContentMeta, ID } from "types/common";

interface props extends ContentMeta {
  onClickDelete: (id: ID) => void;
  onClickEdit: (id: ID) => void;
}

function ContentCard(props: props) {
  const { title, createdAt, contentId, onClickDelete, onClickEdit, status } =
    props;

  return (
    <div className="p-1 my-1 bd-dark">
      <div className="flex flex-row items-center justify-between">
        <h4>{title}</h4>
        <p className="description"></p>

        <div className="text-right">
          <span className={`p-4 ${status === "publish" ? "text-primary" : ""}`}>
            {status}
          </span>

          <span className="p-4">{parseDate(createdAt ?? "")}</span>

          <button
            className="p-4 bg-success"
            onClick={() => {
              contentId && onClickEdit(contentId);
            }}
          >
            수정
          </button>

          <button
            className="p-4 bg-error"
            onClick={() => {
              onClickDelete(contentId ?? -1);
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContentCard;
