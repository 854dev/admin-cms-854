import { ChangeEventHandler, useEffect, useState } from 'react';

import Footer from 'layouts/partials/Footer';

// import LineWithAnnotationChart from 'components/charts/LineWithAnnotationChart';
// import Area from 'components/charts/Area';
import Breadcrumb, { BreadcrumbItem } from 'components/Breadcrumb';
import Button from 'components/Button';
import CustomSelect from 'components/form/CustomSelect';
import Input from 'components/form/Input';
import Label from 'components/form/Label';
// import PolarArea from 'components/charts/PolarArea';
import Textarea from 'components/form/Textarea';

import {
  ContentBody,
  ContentMeta,
  ContentType,
  ContentBodyField,
  CreateBodyFieldDto,
  bodyFieldType,
} from 'types/common';
import api from 'api';

const ContentTypeManage = () => {
  const [contentType, setcontentType] = useState('-1');

  const [contentTypeDetailTrigger, contentTypeDetailResult] =
    api.useLazyGetContentTypeDetailQuery();

  const {
    data: contentTypeListData,
    error: contentTypeListError,
    isSuccess: contentTypeListSuccess,
    refetch: contentTypeListRefetch,
  } = api.useGetContentTypeListQuery({
    page: 1,
    limit: 50,
  });

  const [bodyFieldDeleteTrigger, bodyFieldDeleteResult] = api.useDeleteBodyFieldMutation();

  const [postBodyField, postBodyFieldResult] = api.usePostBodyFieldMutation();

  const [postBodyFieldDto, setPostBodyFieldDto] = useState<CreateBodyFieldDto>({
    contentTypeId: -1,
    fieldTypeId: -1,
    fieldName: '',
    fieldTypeName: 'string',
  });

  /** FUNCTION */
  const getContentTypeDetail = async (id: string) => {
    const res = await contentTypeDetailTrigger(id).unwrap();
  };

  const onChangeContentType: ChangeEventHandler<HTMLSelectElement> = async (e) => {
    setcontentType(e.currentTarget.value);
    getContentTypeDetail(e.currentTarget.value);
  };

  const onClickDeleteBodyField = async (id: string) => {
    const res = await bodyFieldDeleteTrigger(id);
    contentTypeListRefetch();
  };

  const onClickAddField = async () => {
    const body: CreateBodyFieldDto = {
      ...postBodyFieldDto,
      contentTypeId: Number(contentType),
    };

    const res = await postBodyField(body).unwrap();
    console.log(res);
  };

  useEffect(() => {
    if (contentTypeListSuccess) {
      if (contentTypeListData.data.length > 1) {
        const firstId = contentTypeListData.data[0].id;
        setcontentType(firstId);
        getContentTypeDetail(firstId);
      }
    }
  }, [contentTypeListSuccess]);

  return (
    <main className='workspace'>
      <div className='container'>
        {/* Breadcrumb */}
        <section className='breadcrumb'>
          <h1>Content Type</h1>
        </section>

        {/* content type Select */}
        <div className='card relative mb-5 p-4'>
          <h3>콘텐츠 타입 선택</h3>
          <CustomSelect onChange={onChangeContentType}>
            {contentTypeListData ? (
              <>
                {contentTypeListData.data.map((elem: ContentType) => (
                  <option key={elem.id} value={elem.id}>
                    {elem.name}
                  </option>
                ))}
              </>
            ) : null}
          </CustomSelect>
        </div>

        <div className='flex w-full flex-row gap-4'>
          {/* manage body field */}
          <div className='card w-full p-4'>
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
                      {contentTypeDetailResult.data.bodyField.map((elem: ContentBodyField) => {
                        return (
                          <tr key={elem.id}>
                            <td>
                              <div className='text-center'>{elem.fieldTypeName}</div>{' '}
                            </td>
                            <td>
                              <div className='text-center'>{elem.fieldName}</div>
                            </td>
                            <td>
                              <Button
                                className='bg-danger text-center text-sm'
                                onClick={() => {
                                  onClickDeleteBodyField(String(elem.id));
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

          <div className='card w-full p-4'>
            <div className='flex justify-end'>
              <Button className='px-4 text-center text-sm' onClick={onClickAddField}>
                필드 추가
              </Button>
            </div>

            <div className='flex flex-col justify-evenly'>
              <div className='mb-4'>
                <p>필드 이름</p>
                <Input
                  value={postBodyFieldDto.fieldName}
                  onChange={(e) => {
                    setPostBodyFieldDto({
                      ...postBodyFieldDto,
                      fieldName: e.currentTarget.value,
                    });
                  }}
                ></Input>
              </div>

              {/* bodyFieldType 중 하나 */}
              <div>
                <p>필드 타입</p>
                <div className='flex flex-row justify-start gap-4'>
                  {(['string', 'number', 'boolean', 'text'] as bodyFieldType[]).map((elem) => {
                    return (
                      <Button
                        key={elem}
                        className={`${
                          postBodyFieldDto.fieldTypeName === elem ? 'bg-primary' : 'bg-gray-200'
                        } text-sm`}
                        onClick={() => {
                          setPostBodyFieldDto({
                            ...postBodyFieldDto,
                            fieldTypeName: elem,
                          });
                        }}
                      >
                        {elem}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ContentTypeManage;
