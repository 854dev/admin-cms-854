import React from "react";
import { getPageNumbers } from "util/util";

interface PaginationProps {
  totalPage: number;
  page: number;
  setPage: (page: number) => void;
  // limit: number;
  // setLimit: (limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPage,
  page,
  setPage,
  // limit,
  // setLimit,
}) => {
  const handleClick = (pageNum: number) => {
    setPage(pageNum);
  };

  // 페이지 번호 목록 만들기
  const pages = getPageNumbers(page, totalPage, 10);

  return (
    <div>
      <div className="flex flex-row justify-between">
        <button onClick={() => handleClick(page - 1)} disabled={page === 1}>
          이전
        </button>
        {pages.map((pageNum) => (
          <button
            className={`p-4 m-1 ${
              pageNum === page ? "bg-primary text-white" : ""
            }`}
            key={pageNum}
            onClick={() => handleClick(pageNum)}
          >
            {pageNum}
          </button>
        ))}
        <button
          onClick={() => handleClick(page + 1)}
          disabled={page === totalPage}
        >
          다음
        </button>
      </div>
      {/* <div className="flex flex-row">
        <select className="p-4 m-4" value={limit} onChange={handleLimitChange}>
          <option value="10">10개씩 보기</option>
          <option value="20">20개씩 보기</option>
          <option value="50">50개씩 보기</option>
        </select>
      </div> */}
    </div>
  );
};

export default Pagination;
