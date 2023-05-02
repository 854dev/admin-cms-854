import React, { ChangeEvent, useEffect, useState } from "react";
import ReactQuill from "react-quill";

import {
  ContentBodySchema,
  ContentDetail,
  ContentType,
  ID,
} from "types/common";
import { useLocation } from "react-router-dom";
import api from "api/api_rtk";

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
  const [contentType, setcontentType] = useState<number>();
  const {
    data: contentTypeListData,
    error: contentTypeListError,
    isSuccess: contentTypeListSuccess,
    isFetching: contentTypeListIsFetching,
  } = api.useGetContentTypeListQuery({
    page: 1,
    limit: 50,
  });

  const [contentTypeDetailTrigger, contentTypeDetailResult] =
    api.useLazyGetContentTypeDetailQuery();

  const [postContentTrigger, postContentResult] = api.usePostContentMutation();

  const [contentDetail, setContentDetail] =
    useState<ContentDetail>(contentDetailDefault);

  const [contentBodySchema, setContentBodySchema] = useState<
    ContentBodySchema[]
  >([]);

  const onChangeContentType = async (
    contentTypeId: ID,
    contentTypeName: string
  ) => {
    setcontentType(contentTypeId);
    getContentTypeDetail(contentTypeId);
  };

  const getContentTypeDetail = async (id: ID) => {
    const res = await contentTypeDetailTrigger(Number(id)).unwrap();
    setContentBodySchema(res.contentBodySchema);
  };

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
      const res = await postContentTrigger(contentDetail)
        .unwrap()
        .then((payload) => {
          alert(`성공 : ${payload.message}`);
        })
        .catch((error) => {
          alert(`${JSON.stringify(error.data?.message)}`);
        });
    } catch (e) {
      alert(`rejected`);
    }
  };

  /** 컨텐츠 타입 페칭 후  1번쨰 선택. 이전페이지에서 넘어왔다면 이미 선택되어 있음 */
  useEffect(() => {
    if (contentTypeListSuccess && contentTypeListData.data.length > 0) {
      const contentTypeIdLocation = location.state?.contentTypeId;

      const selectedContentType = contentTypeIdLocation
        ? (contentTypeListData.data.find(
            (elem) => elem.contentTypeId === contentTypeIdLocation
          ) as ContentType)
        : contentTypeListData.data[0];

      setcontentType(selectedContentType.contentTypeId);
      setContentDetail({
        ...contentDetail,
        contentTypeId: selectedContentType.contentTypeId,
        contentTypeName: selectedContentType.contentTypeName,
      });
      getContentTypeDetail(selectedContentType.contentTypeId);
    }
  }, [contentTypeListSuccess, contentTypeListIsFetching]);

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
                  <select
                    name="contentTypeSelect"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      const option = e.currentTarget.options[
                        e.currentTarget.options.selectedIndex
                      ].dataset as {
                        contentTypeId: string;
                        contentTypeName: string;
                      };
                      onChangeContentType(
                        Number(option.contentTypeId),
                        option.contentTypeName
                      );
                    }}
                  >
                    {contentTypeListData ? (
                      <>
                        {contentTypeListData.data.map((elem: ContentType) => (
                          <option
                            selected={elem.contentTypeId === contentType}
                            key={elem.contentTypeId}
                            value={elem.contentTypeId}
                            data-content-type-id={elem.contentTypeId}
                            data-content-type-name={elem.contentTypeName}
                          >
                            {elem.contentTypeName}
                          </option>
                        ))}
                      </>
                    ) : null}
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
          <button onClick={onSubmit} name="submit">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContentAdd;
