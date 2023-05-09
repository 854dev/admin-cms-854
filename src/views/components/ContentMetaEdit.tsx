import React, { useState } from "react";
import { ContentDetail } from "types/common";

interface Props {
  disabled: boolean;
  contentDetailForm: ContentDetail;
  onContentDetailChange: (
    key: keyof ContentDetail,
    value: ValueOf<ContentDetail>
  ) => void;
}

function ContentMetaEdit(props: Props) {
  const { disabled, contentDetailForm, onContentDetailChange } = props;

  const [tagInput, setTagInput] = useState("");

  const handleTagInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagKeydown: React.KeyboardEventHandler = (event) => {
    const { tags } = contentDetailForm;
    if (!tags) {
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const newTag = { name: tagInput.trim() };
      if (newTag.name && !tags.find((tag) => tag.name === newTag.name)) {
        setTagInput("");
        onContentDetailChange(e);
      }
    }
  };

  const handleRemoveTag = (tagName: string) => {
    const { tags } = contentDetailForm;
    if (!tags) return;
    const updatedTags = tags.filter((tag) => tag.name !== tagName);
    console.log(updatedTags);
    // onContentDetailChange("tags", uniqueTags);
  };

  const getKeyValueFromInputChangeEvent = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const key = event.target.name as keyof ContentDetail;
    const value = event.target.value;
    return {
      key,
      value,
    };
  };

  return (
    <fieldset disabled={disabled}>
      {/* content meta */}
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={(e) => {
            const { key, value } = getKeyValueFromInputChangeEvent(e);
            onContentDetailChange(key, value);
          }}
        />
      </div>
      <div>
        <label htmlFor="creator">Creator</label>
        <input
          id="creator"
          name="creator"
          type="text"
          onChange={(e) => {
            const { key, value } = getKeyValueFromInputChangeEvent(e);
            onContentDetailChange(key, value);
          }}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          onChange={(e) => {
            const { key, value } = getKeyValueFromInputChangeEvent(e);
            onContentDetailChange(key, value);
          }}
        />
      </div>

      <div className="p-4">
        <label className="block mb-2" htmlFor="status">
          Status
        </label>

        <label>
          <input
            onChange={(e) => {
              const { key, value } = getKeyValueFromInputChangeEvent(e);
              onContentDetailChange(key, value);
            }}
            checked={contentDetailForm.status === "draft"}
            type="radio"
            name="status"
            value="draft"
            className={`p-4 ${
              contentDetailForm.status === "draft"
                ? "bg-primary"
                : "bg-secondary"
            }`}
          ></input>
          draft
        </label>

        <label>
          <input
            onChange={(e) => {
              const { key, value } = getKeyValueFromInputChangeEvent(e);
              onContentDetailChange(key, value);
            }}
            checked={contentDetailForm.status === "publish"}
            type="radio"
            name="status"
            value="publish"
            className={`p-4 ${
              contentDetailForm.status === "publish"
                ? "bg-primary"
                : "bg-secondary"
            }`}
          ></input>
          publish
        </label>
      </div>

      <div>
        <label>
          Tag
          <input
            onChange={handleTagInput}
            type="text"
            name="tag"
            value={tagInput}
            className={`p-4`}
            onKeyDown={handleTagKeydown}
          ></input>
          <ul>
            {contentDetailForm.tags?.map((elem) => (
              <li key={elem.name}>
                {elem.name}
                <button onClick={() => handleRemoveTag(elem.name)}>X</button>
              </li>
            ))}
          </ul>
        </label>
      </div>

      <div>
        <label htmlFor="title">createdAt : {contentDetailForm.createdAt}</label>
      </div>

      <div>
        <label htmlFor="title">updatedAt : {contentDetailForm.updatedAt}</label>
      </div>
    </fieldset>
  );
}

export default ContentMetaEdit;
