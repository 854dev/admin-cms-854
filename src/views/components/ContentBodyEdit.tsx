import React from "react";
import ReactQuill from "react-quill";
import { ContentBodySchema, ContentDetail } from "types/common";
import MDEditor from "@uiw/react-md-editor";

interface Props {
  contentDetail: ContentDetail;
  contentBodySchema: ContentBodySchema[];
  handleBodyChange: (key: string, value: string) => void;
}

function ContentBodyEdit(props: Props) {
  const { contentBodySchema, handleBodyChange, contentDetail } = props;

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
                value={contentDetail.body[elem.schemaName]}
                onChange={(e) => {
                  handleBodyChange(elem.schemaName, e.currentTarget.value);
                }}
              />
            ) : null}

            {elem.schemaType === "text" ? (
              <ReactQuill
                theme="snow"
                className="bg-white react-quill-editor"
                value={contentDetail.body[elem.schemaName]}
                onChange={(content, delta, source, editor) => {
                  handleBodyChange(elem.schemaName, editor.getHTML());
                }}
              ></ReactQuill>
            ) : null}

            {elem.schemaType === "markdown" ? (
              <MDEditor
                className="bg-white"
                height={480}
                value={contentDetail.body[elem.schemaName]}
                onChange={(value) => {
                  handleBodyChange(elem.schemaName, value ?? "");
                }}
              ></MDEditor>
            ) : null}

            <hr />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default ContentBodyEdit;
