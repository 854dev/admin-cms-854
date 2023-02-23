import Input from 'components/form/Input';
import Label from 'components/form/Label';
import React, { useState } from 'react';
import { ContentMeta } from 'types/common';

interface Props {
  meta: ContentMeta;
  setMeta: React.Dispatch<React.SetStateAction<ContentMeta>>;
}

function FormMeta(props: Props) {
  const { meta, setMeta } = props;

  const onChange = (key: keyof ContentMeta, value: string) => {
    setMeta({ ...meta, [key]: value });
  };

  return (
    <div className='grid w-full grid-cols-2 gap-2'>
      <div>
        <div className='text-sm'>제목 (title)</div>
        <Input
          invalid={meta.title.length === 0}
          className='mt-1 py-2'
          placeholder='title'
          onChange={(e) => {
            onChange('title', e.currentTarget.value);
          }}
        />
      </div>

      <div>
        <div className='text-sm'>작성자 (creator)</div>
        <Input
          invalid={meta.title.length === 0}
          className='mt-1 py-2'
          placeholder='creator'
          onChange={(e) => {
            onChange('creator', e.currentTarget.value);
          }}
        />
      </div>

      <div className='text-sm'>작성일 (createdAt) : {meta.createdAt}</div>

      <div className='text-sm'>수정일 (updatedAt) : {meta.updatedAt}</div>
    </div>
  );
}

export default FormMeta;
