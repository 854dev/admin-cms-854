import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";

import {
  ContentBodySchema,
  ContentDetail,
  ContentType,
  ID,
} from "types/common";
import { useLocation, useNavigate } from "react-router-dom";
import api from "api/api_rtk";
import useInitFetch from "hooks/useInitFetch";
import ContentTypeSelect from "./components/ContentTypeSelect";
import { route } from "routes";

const contentDetailDefault: ContentDetail = {
  title: "",
  contentTypeId: -1,
  contentTypeName: "",
  creator: "",
  createdAt: "-",
  updatedAt: "-",
  deletedAt: "",
  status: "draft",
  body: {},
  tags: [],
};

function ContentAdd() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    param: { contentTypeId, setcontentTypeId },
    contentTypeList,
    contentList,
    contentDetail,
  } = useInitFetch();

  const [postContentTrigger, postContentResult] = api.usePostContentMutation();

  const contentType = useCallback(() => {
    return contentTypeList.findContentType(contentTypeId);
  }, [contentTypeId]);

  const contentBodySchema = contentType()
    ? contentType().contentBodySchema
    : [];

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
      const res = await postContentTrigger(contentDetailForm)
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

              <fieldset disabled={!!!contentTypeId}>
                {/* content meta */}
                <div>
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={handleContentDetailChange}
                  />
                </div>
                <div>
                  <label htmlFor="creator">Creator</label>
                  <input
                    id="creator"
                    name="creator"
                    type="text"
                    onChange={handleContentDetailChange}
                  />
                </div>
                <div>
                  <label htmlFor="description">Description</label>
                  <input
                    id="description"
                    name="description"
                    type="text"
                    onChange={handleContentDetailChange}
                  />
                </div>

                <div className="p-4">
                  <label className="block mb-2" htmlFor="status">
                    Status
                  </label>

                  <label>
                    <input
                      onChange={handleContentDetailChange}
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
                      onChange={handleContentDetailChange}
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
                  <label htmlFor="title">
                    createdAt : {contentDetailForm.createdAt}
                  </label>
                </div>

                <div>
                  <label htmlFor="title">
                    updatedAt : {contentDetailForm.updatedAt}
                  </label>
                </div>
              </fieldset>

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
          <button disabled={!!!contentTypeId} onClick={onSubmit} name="submit">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContentAdd;
