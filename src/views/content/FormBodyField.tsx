import api from 'api';
import Button from 'components/Button';
import Input from 'components/form/Input';
import React, { useEffect, useState } from 'react';
import { schemaType, ContentBodySchema, ID } from 'types/common';
import { CreateBodySchemaDto } from 'types/dto';

interface Props {
  contentTypeId: ID;
}

function FormBodyField(props: Props) {
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
    <>
      <div className='flex w-full flex-row gap-4'>
        {/* manage body field */}
        <div className='card w-full p-4'>
          {contentTypeDetailResult.isSuccess ? (
            <h2>{contentTypeDetailResult.data.contentTypeName} 타입 필드 목록</h2>
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
                    {contentTypeDetailResult.data.bodySchema.map((elem: ContentBodySchema) => {
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
                value={postBodyFieldDto.schemaName}
                onChange={(e) => {
                  setPostBodyFieldDto({
                    ...postBodyFieldDto,
                    schemaName: e.currentTarget.value,
                  });
                }}
              ></Input>
            </div>

            {/* schemaType 중 하나 */}
            <div>
              <p>필드 타입</p>
              <div className='flex flex-row justify-start gap-4'>
                {(['string', 'number', 'boolean', 'text'] as schemaType[]).map((elem) => {
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormBodyField;
