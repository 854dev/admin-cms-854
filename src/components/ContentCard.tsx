import React from "react";

import { parseDate } from "util/util";
import { ContentMeta, ID } from "types/common";
import { Link } from "react-router-dom";

interface props extends ContentMeta {
  linkTo: string;
  onClickDelete: (id: ID) => void;
}

function ContentCard(props: props) {
  const { title, createdAt, contentId, linkTo, onClickDelete, status } = props;

  return (
    <div className="bd-dark p-4 my-2">
      <div className="flex flex-row justify-between items-center">
        <h4>{title}</h4>
        <p className="description"></p>

        <div className="text-right">
          <span className={`p-4 ${status === "publish" ? "text-primary" : ""}`}>
            {status}
          </span>

          <span className="p-4">{parseDate(createdAt ?? "")}</span>

          <Link to={linkTo}>
            <button className="bg-success p-4">수정</button>
          </Link>

          <button
            className="bg-error p-4"
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
