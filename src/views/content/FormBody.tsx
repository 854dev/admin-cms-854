import Input from 'components/form/Input';
import Label from 'components/form/Label';
import React, { SetStateAction, useRef, useState } from 'react';
import { ContentBody, ContentBodyWithName } from 'types/common';
import ReactQuill from 'react-quill';

interface Props {
  contentBody: ContentBodyWithName[];
}

const FormBody = React.forwardRef<{ contentBody: ContentBodyWithName[] }, Props>(
  (props, contentBodyRef) => {
    const { contentBody } = props;

    const EachBodyForm = (props: ContentBodyWithName) => {
      // const currentValue = useRef<{ text: string }>();

      const onChangeQuill = (e: string) => {
        const newBody = contentBody.map((elem) => {
          if (elem.schemaId === props.schemaId) {
            return {
              ...elem,
              schemaValue: e,
            };
          }
          return elem;
        });

        if (contentBodyRef.current) {
          contentBodyRef.current.contentBody = newBody;
        }
      };

      return (
        <div className='min-h-[384px] w-full rounded-md p-6 outline-dashed outline-gray-200'>
          <h3>{props.schemaName}</h3>
          <ReactQuill
            className='h-64'
            theme='snow'
            value={props.schemaValue}
            onChange={(content, delta, source, editor) => onChangeQuill(editor.getHTML())}
          ></ReactQuill>
        </div>
      );
    };

    return (
      <div className='w-full gap-2 '>
        {contentBody.map((elem, idx) => {
          return (
            <React.Fragment key={elem.schemaId}>
              <EachBodyForm
                schemaId={elem.schemaId}
                schemaName={elem.schemaName}
                schemaValue={elem.schemaValue}
              ></EachBodyForm>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

export default FormBody;
