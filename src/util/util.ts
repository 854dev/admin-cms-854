import { ContentBody, ContentBodySchema, ContentBodyWithName } from 'types/common';

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
