import { ContentBody, ContentBodySchema, ContentBodyWithName } from 'types/common';
import { DateTime } from 'luxon';
import { DATE_FORMAT } from './constant';

export const createContentBodyFromBodyField: (
  bodyFields: ContentBodySchema[]
) => ContentBodyWithName[] = (bodyFields) => {
  return bodyFields.map((elem) => {
    return {
      schemaId: elem.schemaId,
      schemaName: elem.schemaName,
      schemaValue: '',
    };
  });
};

export const parseDate = (dateString: string, format?: string) => {
  return DateTime.fromISO(dateString).toFormat(format ?? DATE_FORMAT);
};
