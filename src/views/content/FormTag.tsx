import Input from 'components/form/Input';
import React, { useState } from 'react';
import { ContentTag, ID } from 'types/common';
import api from 'api';

function FormTag(props: { tags: ContentTag[]; onChangeTags: (tags: ContentTag[]) => void }) {
  const { tags, onChangeTags } = props;

  const { data: allTagsData } = api.useGetTagQuery({});

  const onClickAddTag = (tag: ContentTag) => {
    onChangeTags([...tags, tag]);
  };

  const onClickDeleteTag = (tag: ContentTag) => {
    const newTags = tags.filter((elem) => elem.tagId !== tag.tagId);
    onChangeTags(newTags);
  };

  const isTagActive = (tag: ContentTag) => {
    return tags.find((elem: ContentTag) => elem.tagId === tag.tagId);
  };

  return (
    <>
      <div className='mb-5'>
        {allTagsData &&
          allTagsData.map((elem: ContentTag) => {
            const isActive = isTagActive(elem);
            return (
              <span
                key={elem.tagId}
                className={`badge mr-1 cursor-pointer select-none ${
                  isActive ? 'badge_primary' : 'badge_secondary'
                }`}
                onClick={() => {
                  if (isActive) {
                    onClickDeleteTag(elem);
                  } else {
                    onClickAddTag(elem);
                  }
                }}
              >
                {elem.name}
              </span>
            );
          })}
      </div>

      {/* <label className='flex-row-reverse form-control-addon-within'>
        <input
          value={tagInput}
          onChange={onChangeTagInput}
          className='w-full border-none form-control ltr:pl-2 rtl:pr-2'
          placeholder='Enter a tag'
        />
        <span className='flex items-center pl-4'>
          {tags.map((elem) => (
            <button
              key={elem.tagId}
              className='badge badge_primary'
              onClick={() => {
                onClickTag(elem);
              }}
            >
              {elem.name}
              <span className='text-sm la la-times'></span>
            </button>
          ))}
        </span>
      </label>
      <small className='block mt-2'>태그는 콤마로 구분</small> */}
    </>
  );
}

export default FormTag;
