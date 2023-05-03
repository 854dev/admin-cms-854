import { useEffect, useState } from "react";

import Footer from "layouts/partials/Footer";

import { ContentBodySchema, ContentType, ID, schemaType } from "types/common";
import api from "api/api_rtk";
import { CreateBodySchemaDto } from "types/dto";

import useInitFetch from "hooks/useInitFetch";
import ContentTypeSelect from "./components/ContentTypeSelect";

const ContentTypeManage = () => {
  const {
    param: { contentTypeId, setcontentTypeId },
    contentTypeList,
  } = useInitFetch();

  const [addContentTypeTrigger, addContentTypeResult] =
    api.usePostContentTypeMutation();

  const [deleteContentTypeTrigger, deleteContentTypeResult] =
    api.useDeleteContentTypeMutation();

  const [contentTypeDto, setContentTypeDto] = useState({
    contentTypeName: "",
  });

  const onClickAddContentType = async () => {
    const res = addContentTypeTrigger(contentTypeDto)
      .then(() => {
        alert("타입 추가 완료");
      })
      .catch(() => {
        alert("에러 발생");
      });
  };

  const onClickDeleteContentType = async () => {
    if (
      !contentTypeId ||
      !confirm(
        `해당 타입의 콘텐츠 전체가 삭제됩니다. ${
          contentTypeList.findContentType(contentTypeId)?.contentTypeName
        } 타입 진짜 삭제?`
      )
    ) {
      return;
    }

    const res = await deleteContentTypeTrigger(contentTypeId)
      .then(() => {
        alert("타입 삭제 완료");
        setcontentTypeId(undefined);
      })
      .catch(() => {
        alert("에러 발생");
      });
  };

  return (
    <main>
      {/* Breadcrumb */}
      <section className="breadcrumb">
        <h1>Content Type</h1>
      </section>

      <div>
        <div className="grid">
          <fieldset>
            {/* content type Select */}
            <div>
              <div className="flex items-center justify-between">
                <span>콘텐츠 타입 선택</span>
                <button
                  className={"bg-error text-white"}
                  onClick={onClickDeleteContentType}
                >
                  삭제
                </button>
              </div>

              <ContentTypeSelect
                contentTypeId={contentTypeId}
                setcontentTypeId={setcontentTypeId}
                contentTypeList={
                  contentTypeList.data ? contentTypeList.data : []
                }
              />
            </div>
          </fieldset>

          <fieldset>
            {/* content type Add */}
            <div className="flex flex-row items-center justify-between">
              <span>콘텐츠 타입 이름</span>
              <button onClick={onClickAddContentType}>콘텐츠 타입 추가</button>
            </div>

            <hr />

            <input
              value={contentTypeDto.contentTypeName}
              onChange={(e) => {
                setContentTypeDto({
                  ...contentTypeDto,
                  contentTypeName: e.currentTarget.value,
                });
              }}
            ></input>
          </fieldset>

          <hr />

          {contentTypeList && contentTypeId ? (
            <FormBodyField contentTypeId={contentTypeId}></FormBodyField>
          ) : null}
        </div>
      </div>

      <Footer />
    </main>
  );
};

function FormBodyField(props: { contentTypeId: ID }) {
  const { contentTypeId } = props;

  const [contentTypeDetailTrigger, contentTypeDetailResult] =
    api.useLazyGetContentTypeDetailQuery();

  const [bodyFieldDeleteTrigger, bodyFieldDeleteResult] =
    api.useDeleteBodySchemaMutation();

  const [postBodyField, postBodyFieldResult] = api.usePostBodySchemaMutation();

  const [postBodyFieldDto, setPostBodyFieldDto] = useState<CreateBodySchemaDto>(
    {
      contentTypeId: -1,
      schemaName: "",
      schemaType: "text",
    }
  );

  /** FUNCTION */
  const getContentTypeDetail = async (id: ID) => {
    const res = await contentTypeDetailTrigger(id).unwrap();
  };

  const onClickDeleteBodyField = async (id: ID) => {
    if (confirm("해당 필드의 데이터가 전부 삭제됩니다. 진짜 삭제?")) {
      const res = await bodyFieldDeleteTrigger(id);
      getContentTypeDetail(contentTypeId);
    }
  };

  const onClickAddField = async () => {
    const body: CreateBodySchemaDto = {
      ...postBodyFieldDto,
      contentTypeId: Number(contentTypeId),
    };

    const res = await postBodyField(body);
    getContentTypeDetail(contentTypeId);
  };

  useEffect(() => {
    getContentTypeDetail(contentTypeId);
  }, [contentTypeId]);

  return (
    <fieldset>
      {/* manage body field */}
      <div>
        {/* field table */}
        {contentTypeDetailResult.isSuccess ? (
          <h3>{contentTypeDetailResult.data.contentTypeName} 필드 관리</h3>
        ) : null}
        <div className="flex flex-row justify-center">
          <table>
            <thead>
              <tr>
                <th className="text-center">필드 타입</th>
                <th className="text-center">필드 명</th>
                <th className="text-center">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {contentTypeDetailResult.isSuccess ? (
                <>
                  {contentTypeDetailResult.data.contentBodySchema.map(
                    (elem: ContentBodySchema) => {
                      return (
                        <tr key={elem.schemaId}>
                          <td>
                            <div className="text-center">{elem.schemaType}</div>{" "}
                          </td>
                          <td>
                            <div className="text-center">{elem.schemaName}</div>
                          </td>
                          <td>
                            <button
                              className="bg-danger text-center"
                              onClick={() => {
                                onClickDeleteBodyField(elem.schemaId);
                              }}
                            >
                              삭제
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </>
              ) : null}
            </tbody>
          </table>
        </div>

        <hr />

        {contentTypeDetailResult.isSuccess ? (
          <>
            <p>{contentTypeDetailResult.data.contentTypeName} 타입 필드 추가</p>

            {/* add field */}
            <div className="flex flex-col">
              {/* schemaType 중 하나 */}
              <div>
                <input
                  className="mb-4"
                  value={postBodyFieldDto.schemaName}
                  onChange={(e) => {
                    setPostBodyFieldDto({
                      ...postBodyFieldDto,
                      schemaName: e.currentTarget.value,
                    });
                  }}
                ></input>

                <div className="flex flex-row justify-between">
                  <div className="flex flex-row justify-between gap-4">
                    {(["string", "text"] as schemaType[]).map((elem) => {
                      return (
                        <button
                          key={elem}
                          className={`${
                            postBodyFieldDto.schemaType === elem
                              ? "bg-primary"
                              : "bg-gray-200"
                          } text-sm`}
                          onClick={() => {
                            setPostBodyFieldDto({
                              ...postBodyFieldDto,
                              schemaType: elem,
                            });
                          }}
                        >
                          {elem}
                        </button>
                      );
                    })}
                  </div>
                  <button className="bg-primary" onClick={onClickAddField}>
                    필드 추가
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </fieldset>
  );
}

export default ContentTypeManage;
