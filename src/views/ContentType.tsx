import { ChangeEventHandler, useEffect, useState } from 'react';

import Footer from 'layouts/partials/Footer';

// import LineWithAnnotationChart from 'components/charts/LineWithAnnotationChart';
// import Area from 'components/charts/Area';
import Breadcrumb, { BreadcrumbItem } from 'components/Breadcrumb';
import Button from 'components/Button';
import CustomSelect from 'components/form/CustomSelect';
import Input from 'components/form/Input';
import Label from 'components/form/Label';

import { ContentBodySchema, ContentType, ID, schemaType } from 'types/common';
import api from 'api';
import { useDispatch } from 'react-redux';
import { setAlert } from 'features/alertSlice';
import { CreateBodySchemaDto } from 'types/dto';

const ContentTypeManage = () => {
  const dispatch = useDispatch();

  const [contentType, setcontentType] = useState<number>();

  const {
    data: contentTypeListData,
    error: contentTypeListError,
    isFetching: contentTypeListIsFetching,
    isSuccess: contentTypeListSuccess,
    refetch: contentTypeListRefetch,
  } = api.useGetContentTypeListQuery(
    {
      page: 1,
      limit: 50,
    },
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );

  const [addContentTypeTrigger, addContentTypeResult] = api.usePostContentTypeMutation();

  const [deleteContentTypeTrigger, deleteContentTypeResult] = api.useDeleteContentTypeMutation();

  const [contentTypeDto, setContentTypeDto] = useState({
    contentTypeName: '',
  });

  const onChangeContentType: ChangeEventHandler<HTMLSelectElement> = async (e) => {
    setcontentType(Number(e.currentTarget.value));
  };

  const onClickAddContentType = async () => {
    const res = addContentTypeTrigger(contentTypeDto)
      .then(() => {
        dispatch(setAlert({ title: '타입 추가 완료', color: 'success' }));
      })
      .catch(() => {
        dispatch(setAlert({ title: '에러 발생', color: 'danger' }));
      });
  };

  const onClickDeleteContentType = async () => {
    if (!contentType || !confirm('해당 타입의 콘텐츠 전체가 삭제됩니다. 진짜 삭제?')) {
      return;
    }

    const res = await deleteContentTypeTrigger(contentType)
      .then(() => {
        dispatch(setAlert({ title: '타입 삭제 완료', color: 'success' }));
        setcontentType(undefined);
      })
      .catch(() => {
        dispatch(setAlert({ title: '에러 발생', color: 'danger' }));
      });
  };

  // useEffect(() => {
  //   if (contentTypeListSuccess) {
  //     if (contentTypeListData.data.length > 0) {
  //       const firstId = contentTypeListData.data[0].contentTypeId;
  //       setcontentType(firstId);
  //     }
  //   }
  // }, [contentTypeListSuccess, contentTypeListIsFetching]);

  return (
    <main className='workspace'>
      <div className='container'>
        {/* Breadcrumb */}
        <section className='breadcrumb'>
          <h1>Content Type</h1>
        </section>

        <div className='grid'>
          <div className='card mb-5 w-full p-4'>
            {/* content type Select */}
            <div className='mb-4'>
              <div className='mb-2 flex items-center justify-between'>
                <p>콘텐츠 타입 선택</p>
                <Button
                  className={'bg-danger py-1 px-2 text-sm'}
                  onClick={onClickDeleteContentType}
                >
                  콘텐츠 타입 삭제
                </Button>
              </div>

              <div className='mb-4'>
                {contentTypeListData ? (
                  <>
                    {contentTypeListData.data.map((elem: ContentType) => (
                      <>
                        <Button
                          className='mb-2 mr-2 text-sm'
                          key={elem.contentTypeId}
                          value={elem.contentTypeId}
                          onClick={onChangeContentType}
                        >
                          {elem.contentTypeName}
                        </Button>
                      </>
                    ))}
                  </>
                ) : null}
              </div>

              {/* <CustomSelect onChange={onChangeContentType}>
                {contentTypeListData ? (
                  <>
                    {contentTypeListData.data.map((elem: ContentType) => (
                      <option key={elem.contentTypeId} value={elem.contentTypeId}>
                        {elem.contentTypeName}
                      </option>
                    ))}
                  </>
                ) : null}
              </CustomSelect> */}
            </div>

            {/* content type Add */}
            <div>
              <div className='mb-2 flex items-center justify-between'>
                <p>콘텐츠 타입 이름</p>
                <Button className={'py-1 px-2 text-sm'} onClick={onClickAddContentType}>
                  콘텐츠 타입 추가
                </Button>
              </div>

              <Input
                value={contentTypeDto.contentTypeName}
                onChange={(e) => {
                  setContentTypeDto({
                    ...contentTypeDto,
                    contentTypeName: e.currentTarget.value,
                  });
                }}
              ></Input>
            </div>
          </div>

          {contentTypeListData && contentType ? (
            <FormBodyField contentTypeId={contentType}></FormBodyField>
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

  const [bodyFieldDeleteTrigger, bodyFieldDeleteResult] = api.useDeleteBodySchemaMutation();

  const [postBodyField, postBodyFieldResult] = api.usePostBodySchemaMutation();

  const [postBodyFieldDto, setPostBodyFieldDto] = useState<CreateBodySchemaDto>({
    contentTypeId: -1,
    schemaName: '',
    schemaType: 'text',
  });

  /** FUNCTION */
  const getContentTypeDetail = async (id: ID) => {
    const res = await contentTypeDetailTrigger(id).unwrap();
  };

  const onClickDeleteBodyField = async (id: ID) => {
    const res = await bodyFieldDeleteTrigger(id);
    getContentTypeDetail(contentTypeId);
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
    <div className='grid gap-4'>
      {/* manage body field */}
      <div className='card w-full p-4'>
        {contentTypeDetailResult.isSuccess ? (
          <Label>{contentTypeDetailResult.data.contentTypeName} 타입 필드 추가</Label>
        ) : null}

        {/* add field */}
        <div className='mb-12 flex flex-col justify-evenly'>
          {/* schemaType 중 하나 */}
          <div>
            <Input
              className='mb-4'
              value={postBodyFieldDto.schemaName}
              onChange={(e) => {
                setPostBodyFieldDto({
                  ...postBodyFieldDto,
                  schemaName: e.currentTarget.value,
                });
              }}
            ></Input>

            <div className='flex flex-row justify-between'>
              <div className='flex flex-row justify-between gap-4'>
                {(['string', 'text'] as schemaType[]).map((elem) => {
                  return (
                    <Button
                      key={elem}
                      className={`${
                        postBodyFieldDto.schemaType === elem ? 'bg-primary' : 'bg-gray-200'
                      } text-sm`}
                      onClick={() => {
                        setPostBodyFieldDto({
                          ...postBodyFieldDto,
                          schemaType: elem,
                        });
                      }}
                    >
                      {elem}
                    </Button>
                  );
                })}
              </div>
              <Button
                className='justify-self-end px-4 text-center text-sm'
                onClick={onClickAddField}
              >
                필드 추가
              </Button>
            </div>
          </div>
        </div>

        {/* field table */}
        {contentTypeDetailResult.isSuccess ? (
          <Label>{contentTypeDetailResult.data.contentTypeName} 타입 필드 목록</Label>
        ) : null}
        <div className='flex flex-row justify-center'>
          <table className='table w-full'>
            <thead>
              <tr>
                <th>필드 타입</th>
                <th>필드 명</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {contentTypeDetailResult.isSuccess ? (
                <>
                  {contentTypeDetailResult.data.contentBodySchema.map((elem: ContentBodySchema) => {
                    return (
                      <tr key={elem.schemaId}>
                        <td>
                          <div className='text-center'>{elem.schemaType}</div>{' '}
                        </td>
                        <td>
                          <div className='text-center'>{elem.schemaName}</div>
                        </td>
                        <td>
                          <Button
                            className='bg-danger text-center text-sm'
                            onClick={() => {
                              onClickDeleteBodyField(elem.schemaId);
                            }}
                          >
                            삭제
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ContentTypeManage;
