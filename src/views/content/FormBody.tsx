import Input from 'components/form/Input';
import Label from 'components/form/Label';
import React, { useState } from 'react';
import { ContentBody } from 'types/common';
import ReactQuill from 'react-quill';

interface Props {
  body: ContentBody[];
  onSubmit: (contentBodies: ContentBody[]) => void;
}

function FormBody(props: Props) {
  const { body, onSubmit } = props;

  const EachBodyForm = (props: ContentBody) => {
    return (
      <div className='min-h-[384px] w-full rounded-md p-6 outline-dashed outline-gray-200'>
        <h3>{props.bodyFieldName}</h3>
        <ReactQuill
          className='h-64'
          theme='snow'
          value={props.bodyFieldValue}
          onChange={() => {}}
        ></ReactQuill>
      </div>
    );
  };

  return (
    <div className='w-full gap-2 '>
      {body.map((elem, idx) => {
        return (
          <React.Fragment key={elem.bodyFieldId}>
            <EachBodyForm
              bodyFieldId={elem.bodyFieldId}
              bodyFieldName={elem.bodyFieldName}
              bodyFieldValue={elem.bodyFieldValue}
            ></EachBodyForm>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default FormBody;
