import React from "react";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  limit,
  setLimit,
}) => {
  const handleClick = (pageNum: number) => {
    setPage(pageNum);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e.target.value));
  };

  // 총 페이지 수 계산
  const totalPage = Math.ceil(100 / limit);

  // 페이지 번호 목록 만들기
  const pages = [];
  const maxDisplayPages = 10; // 한 번에 표시할 페이지 수
  const startPage = Math.max(1, Math.ceil(page - maxDisplayPages / 2));
  const endPage = Math.min(totalPage, startPage + maxDisplayPages - 1);
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

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
      <div className="flex flex-row">
        <select className="p-4 m-4" value={limit} onChange={handleLimitChange}>
          <option value="10">10개씩 보기</option>
          <option value="20">20개씩 보기</option>
          <option value="50">50개씩 보기</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
