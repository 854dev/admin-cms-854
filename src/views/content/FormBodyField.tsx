import api from 'api';
import Button from 'components/Button';
import Input from 'components/form/Input';
import React, { useEffect, useState } from 'react';
import { bodyFieldType, ContentBodyField, CreateBodyFieldDto } from 'types/common';

interface Props {
  contentTypeId: number | string;
  contentTypeListRefetch: any;
}

function FormBodyField(props: Props) {
  const { contentTypeId, contentTypeListRefetch } = props;

  const [contentTypeDetailTrigger, contentTypeDetailResult] =
    api.useLazyGetContentTypeDetailQuery();

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

  const onClickDeleteBodyField = async (id: string) => {
    const res = await bodyFieldDeleteTrigger(id);
    getContentTypeDetail(String(contentTypeId));
  };

  const onClickAddField = async () => {
    const body: CreateBodyFieldDto = {
      ...postBodyFieldDto,
      contentTypeId: Number(contentTypeId),
    };

    const res = await postBodyField(body);
    getContentTypeDetail(String(contentTypeId));
  };

  useEffect(() => {
    getContentTypeDetail(String(contentTypeId));
  }, [contentTypeId]);

  return (
    <>
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
    </>
  );
}

export default FormBodyField;
