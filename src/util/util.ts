import { ContentBodyField } from 'types/common';

export const createContentBodyFromBodyField = (bodyFields: ContentBodyField[]) => {
  return bodyFields.map((elem) => {
    return {
      bodyFieldId: elem.fieldTypeId,
      bodyFieldName: elem.fieldName,
      bodyFieldValue: '',
    };
  });
};
