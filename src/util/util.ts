import { DateTime } from "luxon";
import { DATE_FORMAT } from "./constant";
import { compile } from "path-to-regexp";

export const parseDate = (dateString: string, format?: string) => {
  return DateTime.fromISO(dateString).toFormat(format ?? DATE_FORMAT);
};

// route path 에 정규식으로 인자 전달
export function compileRouteParam(
  path: string,
  params: { [key: string]: string }
) {
  return compile(path)(params);
}

export function getPageNumbers(
  currentPage: number,
  totalPage: number,
  pagesToShow = 10
) {
  const startPage =
    Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
  const endPage = Math.min(startPage + pagesToShow - 1, totalPage);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, idx) => startPage + idx
  );
  return pages;
}
