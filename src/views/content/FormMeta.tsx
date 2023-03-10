import Badge from 'components/Badge';
import Input from 'components/form/Input';
import Label from 'components/form/Label';
import React, { useState } from 'react';
import { ContentDetail } from 'types/common';

/** 콘텐츠 메타는 contentDetail 수정시에만 수정 가능하다 */
interface Props {
  contentDetail: ContentDetail;
  setContentDetail: React.Dispatch<React.SetStateAction<ContentDetail>>;
}

function FormMeta(props: Props) {
  const { contentDetail, setContentDetail } = props;

  const onChange = (key: keyof ContentDetail, value: string) => {
    setContentDetail({ ...contentDetail, [key]: value });
  };

  const { title, creator, status, createdAt, updatedAt } = contentDetail;

  return (
    <div className='grid w-full grid-cols-2 gap-4'>
      <div>
        <div className='text-sm'>제목 (title)</div>
        <Input
          invalid={false}
          value={title}
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
          invalid={false}
          value={creator}
          className='mt-1 py-2'
          placeholder='creator'
          onChange={(e) => {
            onChange('creator', e.currentTarget.value);
          }}
        />
      </div>

      <div>
        <div className='mb-2 text-sm'>게시상태 (status)</div>

        <div className='mb-4 flex flex-row justify-start gap-4'>
          <div className='cursor-pointer' onClick={() => onChange('status', 'draft')}>
            <Badge className={`p-3 ${status === 'draft' ? 'bg-primary' : 'bg-gray-300'}`}>
              <span>draft : 초안</span>
            </Badge>
          </div>
          <div className='cursor-pointer' onClick={() => onChange('status', 'publish')}>
            <Badge className={`p-3 ${status === 'publish' ? 'bg-primary' : 'bg-gray-300'}`}>
              <span>publish : 게시</span>
            </Badge>
          </div>
        </div>

        <div className='text-sm'>작성일 (createdAt) : {createdAt}</div>

        <div className='text-sm'>수정일 (updatedAt) : {updatedAt}</div>
      </div>
    </div>
  );
}

export default FormMeta;
