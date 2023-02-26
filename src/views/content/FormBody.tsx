import Input from 'components/form/Input';
import Label from 'components/form/Label';
import React, { SetStateAction, useRef, useState } from 'react';
import { ContentBody } from 'types/common';
import ReactQuill from 'react-quill';

interface Props {
  contentBody: ContentBody[];
}

const FormBody = React.forwardRef<{ contentBody: ContentBody[] }, Props>(
  (props, contentBodyRef) => {
    const { contentBody } = props;

    const EachBodyForm = (props: ContentBody) => {
      // const currentValue = useRef<{ text: string }>();

      const onChangeQuill = (e: string) => {
        const newBody = contentBody.map((elem) => {
          if (elem.bodyFieldId === props.bodyFieldId) {
            return {
              ...elem,
              bodyFieldValue: e,
            };
          }
          return elem;
        });

        if (contentBodyRef.current) {
          contentBodyRef.current.contentBody = newBody;
        }

        // setContentBody(newBody);
      };

      return (
        <div className='min-h-[384px] w-full rounded-md p-6 outline-dashed outline-gray-200'>
          <h3>{props.bodyFieldName}</h3>
          <ReactQuill
            className='h-64'
            theme='snow'
            value={props.bodyFieldValue}
            onChange={(content, delta, source, editor) => onChangeQuill(editor.getHTML())}
          ></ReactQuill>
        </div>
      );
    };

    return (
      <div className='w-full gap-2 '>
        {contentBody.map((elem, idx) => {
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
);

export default FormBody;
