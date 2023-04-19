import React, { useState } from 'react';
import { ContentDetail, ContentBody } from 'types/common';

interface Props {
  contentDetail: ContentDetail;
  onSubmit: (contentDetail: ContentDetail) => void;
}

const ContentForm: React.FC<Props> = ({ contentDetail, onSubmit }) => {
  const [title, setTitle] = useState<string>(contentDetail.title);
  const [body, setBody] = useState<ContentBody>(contentDetail.body);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedContentDetail: ContentDetail = {
      ...contentDetail,
      title,
      body,
    };

    onSubmit(updatedContentDetail);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    setBody((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Title</label>
        <input id='title' type='text' value={title} onChange={handleTitleChange} />
      </div>
      {Object.entries(body).map(([key, value]) => (
        <div key={key}>
          <label htmlFor={key}>{key}</label>
          <input id={key} name={key} type='text' value={value} onChange={handleBodyChange} />
        </div>
      ))}
      <button type='submit'>Submit</button>
    </form>
  );
};

export default ContentForm;
