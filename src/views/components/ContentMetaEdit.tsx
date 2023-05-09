import React from "react";
import { ContentDetail } from "types/common";

interface Props {
  disabled: boolean;
  contentDetailForm: ContentDetail;
  onContentDetailChange: React.ChangeEventHandler;
}

function ContentMetaEdit(props: Props) {
  const { disabled, contentDetailForm, onContentDetailChange } = props;

  return (
    <fieldset disabled={disabled}>
      {/* content meta */}
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={onContentDetailChange}
        />
      </div>
      <div>
        <label htmlFor="creator">Creator</label>
        <input
          id="creator"
          name="creator"
          type="text"
          onChange={onContentDetailChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          onChange={onContentDetailChange}
        />
      </div>

      <div className="p-4">
        <label className="block mb-2" htmlFor="status">
          Status
        </label>

        <label>
          <input
            onChange={onContentDetailChange}
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
            onChange={onContentDetailChange}
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
        <label htmlFor="title">createdAt : {contentDetailForm.createdAt}</label>
      </div>

      <div>
        <label htmlFor="title">updatedAt : {contentDetailForm.updatedAt}</label>
      </div>
    </fieldset>
  );
}

export default ContentMetaEdit;
