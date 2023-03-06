import { ContentBody, ContentBodySchema } from 'types/common';

export const createContentBodyFromBodyField: (bodyFields: ContentBodySchema[]) => ContentBody[] = (
  bodyFields
) => {
  return bodyFields.map((elem) => {
    return {
      bodyFieldId: elem.id,
      bodyField: elem.fieldName,
      bodyFieldValue: '',
    };
  });
};
