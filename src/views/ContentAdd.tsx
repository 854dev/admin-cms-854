import React, { useState } from "react";
import ReactQuill from "react-quill";

import { ContentDetail, ContentType } from "types/common";
import { useNavigate } from "react-router-dom";
import api from "api/api_rtk";
import useInitFetch from "hooks/useInitFetch";
import ContentTypeSelect from "./components/ContentTypeSelect";
import ContentMetaEdit from "./components/ContentMetaEdit";
import { route } from "routes";

function ContentAdd() {
  const navigate = useNavigate();
  const {
    param: { contentTypeId, setcontentTypeId },
    contentTypeList,
    contentDetail,
  } = useInitFetch();

  const [postContentTrigger] = api.usePostContentMutation();

  const contentType = contentTypeList.findContentType(contentTypeId);

  const contentBodySchema = contentType ? contentType.contentBodySchema : [];

  const [contentDetailForm, setContentDetailForm] = useState<ContentDetail>(
    contentDetail.formDefault
  );

  const handleContentTypeChange = (contentType: ContentType) => {
    const { contentTypeId, contentTypeName } = contentType;

    setContentDetailForm((prevState) => ({
      ...prevState,
      contentTypeId,
      contentTypeName,
    }));
  };

  const handleContentDetailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const key = event.target.name as keyof ContentDetail;
    const value = event.target.value;

    setContentDetailForm((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleBodyChange = (key: string, value: string) => {
    setContentDetailForm((prevState) => ({
      ...prevState,
      body: { ...prevState.body, [key]: value },
    }));
  };

  const onSubmit = async () => {
    try {
      await postContentTrigger(contentDetailForm)
        .unwrap()
        .then((payload) => {
          alert(`성공 : ${payload.message}`);
          navigate(route.content.absPath);
        })
        .catch((error) => {
          alert(`${JSON.stringify(error.data?.message)}`);
        });
    } catch (e) {
      alert(`rejected`);
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <section className="breadcrumb">
        <h1>Content Add</h1>
      </section>

      <div className="">
        {/* content type Select */}
        <div className="relative p-4 mb-5">
          {/* Content */}
          <div>
            <div>
              <fieldset>
                <div>
                  <label htmlFor="contentTypeSelect">콘텐츠 타입 선택</label>

                  {/* content type Select */}
                  <ContentTypeSelect
                    contentTypeId={contentTypeId}
                    setcontentTypeId={setcontentTypeId}
                    contentTypeList={
                      contentTypeList.data ? contentTypeList.data : []
                    }
                    onChange={handleContentTypeChange}
                  />
                </div>
              </fieldset>

              <hr />

              <ContentMetaEdit
                disabled={!contentTypeId}
                contentDetailForm={contentDetailForm}
                onContentDetailChange={handleContentDetailChange}
              ></ContentMetaEdit>

              <hr />

              {/* content body */}
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
                            handleBodyChange(
                              elem.schemaName,
                              e.currentTarget.value
                            );
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
            </div>
          </div>
        </div>

        <div className="my-1 text-right">
          <button disabled={!contentTypeId} onClick={onSubmit} name="submit">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContentAdd;
