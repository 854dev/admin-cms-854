import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';

interface ContentSchema {
  schemaId: number;
  contentTypeId: number;
  schemaType: 'text' | 'string';
  schemaName: string;
}

interface Props {
  contentSchema: ContentSchema;
}

function ContentForm({ contentSchema }: Props) {
  const [schema, setSchema] = useState<ContentSchema[]>([]);

  // useEffect(() => {
  //   axios.get<ContentSchema[]>('/content-schema/').then((response) => {
  //     setSchema(response.data);
  //   });
  // }, []);

  const getFieldComponent = (schemaName: string) => {
    const fieldSchema = schema.find((s) => s.schemaName === schemaName);

    if (!fieldSchema) {
      throw new Error(`Schema not found for schemaName: ${schemaName}`);
    }

    if (fieldSchema.schemaType === 'text') {
      return (
        <ReactQuill
          value={initialBody[schemaName]}
          onChange={(value) => handleBodyChange(schemaName, value)}
        />
      );
    } else {
      return (
        <input
          type='text'
          value={initialBody[schemaName]}
          onChange={(event) => handleBodyChange(schemaName, event.target.value)}
        />
      );
    }
  };

  const handleBodyChange = (schemaName: string, value: string) => {
    // Body 변경 사항 처리
  };

  return (
    <div>
      {schema.map((field) => (
        <div key={field.schemaName}>
          <label>{field.schemaName}</label>
          {getFieldComponent(field.schemaName)}
        </div>
      ))}
    </div>
  );
}

export default ContentForm;
