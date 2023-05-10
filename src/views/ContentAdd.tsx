import React, { useState } from "react";

import { ContentDetail, ContentType, ValueOf } from "types/common";
import { useNavigate } from "react-router-dom";
import api from "api/api_rtk";
import useInitFetch from "hooks/useInitFetch";
import ContentTypeSelect from "./components/ContentTypeSelect";
import ContentMetaEdit from "./components/ContentMetaEdit";
import ContentBodyEdit from "./components/ContentBodyEdit";
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
    key: keyof ContentDetail,
    value: ValueOf<ContentDetail>
  ) => {
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
              </fieldset>

              <hr />

              <ContentMetaEdit
                disabled={!contentTypeId}
                contentDetailForm={contentDetailForm}
                onContentDetailChange={(key, value) => {
                  handleContentDetailChange(key, value);
                }}
              ></ContentMetaEdit>

              <hr />

              {/* content body */}
              <ContentBodyEdit
                contentBodySchema={contentBodySchema}
                handleBodyChange={handleBodyChange}
              ></ContentBodyEdit>
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
