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
import FormBodyField from './content/FormBodyField';
import { useDispatch } from 'react-redux';
import { setAlert } from 'features/alertSlice';

const ContentTypeManage = () => {
  const dispatch = useDispatch();

  const [contentType, setcontentType] = useState('-1');

  const {
    data: contentTypeListData,
    error: contentTypeListError,
    isSuccess: contentTypeListSuccess,
    refetch: contentTypeListRefetch,
  } = api.useGetContentTypeListQuery({
    page: 1,
    limit: 50,
  });

  const [addContentTypeTrigger, addContentTypeResult] = api.usePostContentTypeMutation();

  const [deleteContentTypeTrigger, deleteContentTypeResult] = api.useDeleteContentTypeMutation();

  const [contentTypeDto, setContentTypeDto] = useState({
    name: '',
  });

  const onChangeContentType: ChangeEventHandler<HTMLSelectElement> = async (e) => {
    setcontentType(e.currentTarget.value);
  };

  const onClickAddContentType = async () => {
    const res = await addContentTypeTrigger(contentTypeDto).unwrap();
    if (addContentTypeResult.isSuccess) {
      dispatch(setAlert({ title: '타입 추가 완료', color: 'success' }));
    } else {
      dispatch(setAlert({ title: '에러 발생', color: 'danger' }));
    }
  };

  const onClickDeleteContentType = async () => {
    const res = await deleteContentTypeTrigger(Number(contentType)).unwrap();
    if (deleteContentTypeResult.isSuccess) {
      dispatch(setAlert({ title: '타입 삭제 완료', color: 'success' }));
    } else {
      dispatch(setAlert({ title: '에러 발생', color: 'danger' }));
    }
  };

  useEffect(() => {
    if (contentTypeListSuccess) {
      if (contentTypeListData.data.length > 1) {
        const firstId = contentTypeListData.data[0].id;
        setcontentType(firstId);
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

        <div className='flex flex-row justify-between gap-4'>
          {/* content type Select */}
          <div className='card mb-5 w-full p-4'>
            <div className='mb-2 flex justify-between'>
              <p>콘텐츠 타입 이름</p>
              <Button className={'bg-danger py-1 px-2 text-sm'} onClick={onClickDeleteContentType}>
                콘텐츠 타입 삭제
              </Button>
            </div>

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

          {/* content type Select */}
          <div className='card mb-5 w-full p-4'>
            <div className='mb-2 flex justify-between'>
              <p>콘텐츠 타입 이름</p>
              <Button className={'py-1 px-2 text-sm'} onClick={onClickAddContentType}>
                콘텐츠 타입 추가
              </Button>
            </div>

            <Input
              value={contentTypeDto.name}
              onChange={(e) => {
                setContentTypeDto({
                  ...contentTypeDto,
                  name: e.currentTarget.value,
                });
              }}
            ></Input>
          </div>
        </div>

        <FormBodyField
          contentTypeId={contentType}
          contentTypeListRefetch={contentTypeListRefetch}
        ></FormBodyField>
      </div>

      <Footer />
    </main>
  );
};

export default ContentTypeManage;
