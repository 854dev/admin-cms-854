import { ContentBody, ContentBodySchema } from 'types/common';

export const createContentBodyFromBodyField: (bodyFields: ContentBodySchema[]) => ContentBody[] = (
  bodyFields
) => {
  return bodyFields.map((elem) => {
    return {
      schemaId: elem.schemaId,
      schemaName: elem.schemaName,
      schemaValue: '',
    };
  });
};
