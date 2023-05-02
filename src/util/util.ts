import { DateTime } from "luxon";
import { DATE_FORMAT } from "./constant";
import { compile } from "path-to-regexp";

export const parseDate = (dateString: string, format?: string) => {
  return DateTime.fromISO(dateString).toFormat(format ?? DATE_FORMAT);
};

// route path 에 정규식으로 인자 전달
export function routeParam(path: string, params: { [key: string]: string }) {
  return compile(path)(params);
}
