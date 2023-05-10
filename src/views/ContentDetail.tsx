import React, { useEffect, useState } from "react";

import { ContentDetail, ContentType, ValueOf } from "types/common";
import { useParams, useNavigate } from "react-router-dom";
import api from "api/api_rtk";
import useInitFetch from "hooks/useInitFetch";
import ContentTypeSelect from "./components/ContentTypeSelect";
import { route } from "routes";
import ContentMetaEdit from "./components/ContentMetaEdit";
import ContentBodyEdit from "./components/ContentBodyEdit";

function ContentDetailPage() {
  const param = useParams();
  const navigate = useNavigate();

  const paramContentId = param.contentId;

  const { data: contentDetailData } = api.useGetContentDetailQuery(
    Number(paramContentId)
  );

  const {
    param: { setcontentTypeId, setcontentId },
    contentTypeList,
    contentDetail,
  } = useInitFetch();

  const [putContentTrigger, putContentResult] = api.usePutContentMutation();

  const contentTypeId = contentDetailData?.contentTypeId;

  const contentBodySchema = contentTypeList.findContentType(
    contentDetailData?.contentTypeId
  )?.contentBodySchema;

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
      const { contentId } = contentDetailForm;

      if (!contentId) return;

      const res = await putContentTrigger({ ...contentDetailForm, contentId })
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

  useEffect(() => {
    if (paramContentId) {
      setcontentId(Number(paramContentId));
    }
  }, [paramContentId, setcontentId]);

  useEffect(() => {
    if (contentDetail.data) {
      setContentDetailForm(contentDetail.data);
    }
  }, [contentDetail.data]);

  return (
    <div>
      {/* Breadcrumb */}
      <section className="breadcrumb">
        <h1>Content Detail : {contentDetailForm.contentId}</h1>
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
                    disabled
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
                onContentDetailChange={(key, value) => {
                  handleContentDetailChange(key, value);
                }}
              ></ContentMetaEdit>

              <hr />

              {/* content body */}
              {contentBodySchema ? (
                <ContentBodyEdit
                  contentBodySchema={contentBodySchema}
                  handleBodyChange={handleBodyChange}
                ></ContentBodyEdit>
              ) : null}
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

export default ContentDetailPage;
