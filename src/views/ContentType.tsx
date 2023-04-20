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

import { ContentBody, ContentMeta, ContentType } from 'types/common';
import api from 'api';
import FormBodyField from './content/FormBodyField';
import { useDispatch } from 'react-redux';
import { setAlert } from 'features/alertSlice';

const ContentTypeManage = () => {
  const dispatch = useDispatch();

  const [contentType, setcontentType] = useState<number>();

  const {
    data: contentTypeListData,
    error: contentTypeListError,
    isFetching: contentTypeListIsFetching,
    isSuccess: contentTypeListSuccess,
    refetch: contentTypeListRefetch,
  } = api.useGetContentTypeListQuery({
    page: 1,
    limit: 50,
  });

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

  useEffect(() => {
    if (contentTypeListSuccess) {
      if (contentTypeListData.data.length > 0) {
        const firstId = contentTypeListData.data[0].contentTypeId;
        setcontentType(firstId);
      }
    }
  }, [contentTypeListSuccess, contentTypeListIsFetching]);

  return (
    <main className='workspace'>
      <div className='container'>
        {/* Breadcrumb */}
        <section className='breadcrumb'>
          <h1>Content Type</h1>
        </section>

        <div className='grid'>
          <div className='card mb-5 p-4 sm:w-full md:w-1/2'>
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

              <CustomSelect onChange={onChangeContentType}>
                {contentTypeListData ? (
                  <>
                    {contentTypeListData.data.map((elem: ContentType) => (
                      <option key={elem.contentTypeId} value={elem.contentTypeId}>
                        {elem.contentTypeName}
                      </option>
                    ))}
                  </>
                ) : null}
              </CustomSelect>
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
        </div>

        {contentTypeListData && contentType ? (
          <FormBodyField contentTypeId={contentType}></FormBodyField>
        ) : null}
      </div>

      <Footer />
    </main>
  );
};

export default ContentTypeManage;
