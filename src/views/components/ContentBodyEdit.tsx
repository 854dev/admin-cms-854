import React from "react";
import ReactQuill from "react-quill";
import { ContentBodySchema } from "types/common";

interface Props {
  contentBodySchema: ContentBodySchema[];
  handleBodyChange: (key: string, value: string) => void;
}

function ContentBodyEdit(props: Props) {
  const { contentBodySchema, handleBodyChange } = props;

  return (
    <div>
      {contentBodySchema.map((elem) => {
        return (
          <React.Fragment key={elem.schemaName}>
            <label htmlFor="title">{elem.schemaName}</label>

            {elem.schemaType === "string" ? (
              <input
                id={elem.schemaName}
                name={elem.schemaName}
                type="text"
                onChange={(e) => {
                  handleBodyChange(elem.schemaName, e.currentTarget.value);
                }}
              />
            ) : null}

            {elem.schemaType === "text" ? (
              <ReactQuill
                theme="snow"
                className="bg-white react-quill-editor"
                onChange={(content, delta, source, editor) => {
                  handleBodyChange(elem.schemaName, editor.getHTML());
                }}
              ></ReactQuill>
            ) : null}

            <hr />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default ContentBodyEdit;
