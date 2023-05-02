import React, { ChangeEvent, useEffect, useState } from "react";
import ReactQuill from "react-quill";

import { ContentBodySchema, ContentDetail, ContentType } from "types/common";
import { useParams } from "react-router-dom";
import api from "api/api_rtk";

const contentDetailDefault: ContentDetail = {
  title: "",
  description: "",
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

function ContentDetailPage() {
  const contentId = useParams().contentId;

  const [fetchContentDetail, contentDetailResponse] =
    api.useLazyGetContentDetailQuery();

  const [contentTypeDetailTrigger, contentTypeDetailResult] =
    api.useLazyGetContentTypeDetailQuery();

  const [triggerPatchContent, patchContentResponse] =
    api.usePutContentMutation();

  const [contentDetail, setContentDetail] =
    useState<ContentDetail>(contentDetailDefault);

  const [contentBodySchema, setContentBodySchema] = useState<
    ContentBodySchema[]
  >([]);

  const handleContentDetailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const key = event.target.name as keyof ContentDetail;
    const value = event.target.value;

    setContentDetail((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleBodyChange = (key: string, value: string) => {
    setContentDetail((prevState) => ({
      ...prevState,
      body: { ...prevState.body, [key]: value },
    }));
  };

  const onSubmit = async () => {
    try {
      const res = triggerPatchContent({
        ...contentDetail,
        contentId: Number(contentId) ?? -1,
      })
        .unwrap()
        .then((response) => {
          alert(`성공 : ${response.message}`);
        });
    } catch (e) {
      alert(`rejected`);
    }
  };

  const getContentDetail = async (contentId: number) => {
    const res = (await fetchContentDetail(contentId).unwrap()) as ContentDetail;
    const contentTypeDetailRes = await contentTypeDetailTrigger(
      Number(res.contentTypeId)
    ).unwrap();

    setContentBodySchema(contentTypeDetailRes.contentBodySchema);
    setContentDetail(res);
  };

  useEffect(() => {
    if (contentId) {
      getContentDetail(Number(contentId));
    }
  }, [contentId]);

  return (
    <main className="workspace">
      {/* Breadcrumb */}
      <section className="breadcrumb">
        <h1>Content Detail</h1>
      </section>

      <div className="">
        {/* content type Select */}
        <div className="relative p-4">
          {/* Content */}
          <div>
            <div>
              <fieldset>
                <div>
                  <label htmlFor="contentTypeSelect">콘텐츠 타입 선택</label>
                  <select name="contentTypeSelect" disabled>
                    <option>{contentDetail.contentTypeName}</option>
                  </select>
                </div>

                <hr />

                {/* content meta */}
                <div>
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={handleContentDetailChange}
                    value={contentDetail.title}
                  />
                </div>
                <div>
                  <label htmlFor="creator">Creator</label>
                  <input
                    id="creator"
                    name="creator"
                    type="text"
                    onChange={handleContentDetailChange}
                    value={contentDetail.creator}
                  />
                </div>
                <div>
                  <label htmlFor="description">Description</label>
                  <input
                    id="description"
                    name="description"
                    type="text"
                    onChange={handleContentDetailChange}
                    value={contentDetail.description}
                  />
                </div>

                <div className="p-4">
                  <label className="block mb-2" htmlFor="status">
                    Status
                  </label>

                  <label>
                    <input
                      onChange={handleContentDetailChange}
                      type="radio"
                      name="status"
                      value="draft"
                      className={`p-4 ${
                        contentDetail.status === "draft"
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                    ></input>
                    draft
                  </label>

                  <label>
                    <input
                      onChange={handleContentDetailChange}
                      type="radio"
                      name="status"
                      value="publish"
                      className={`p-4 ${
                        contentDetail.status === "publish"
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                    ></input>
                    publish
                  </label>
                </div>

                <div>
                  <label htmlFor="title">
                    createdAt : {contentDetail.createdAt}
                  </label>
                  <label htmlFor="title">
                    updatedAt : {contentDetail.updatedAt}
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
                          defaultValue={contentDetail.body[elem.schemaName]}
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
                          defaultValue={contentDetail.body[elem.schemaName]}
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
          <button onClick={onSubmit} name="submit">
            Submit
          </button>
        </div>
      </div>
    </main>
  );
}

export default ContentDetailPage;
