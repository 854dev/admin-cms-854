import { ChangeEventHandler, useEffect, useState } from 'react';

import Footer from 'layouts/partials/Footer';

// import LineWithAnnotationChart from 'components/charts/LineWithAnnotationChart';
// import Area from 'components/charts/Area';
import Badge from 'components/Badge';
import Breadcrumb, { BreadcrumbItem } from 'components/Breadcrumb';
import Button from 'components/Button';
import CustomSelect from 'components/form/CustomSelect';
import Input from 'components/form/Input';
import Label from 'components/form/Label';
// import PolarArea from 'components/charts/PolarArea';
import Textarea from 'components/form/Textarea';

import { ContentBody, ContentMeta, ContentType } from 'types/common';
import api from 'api';

const ContentTypeManage = () => {
  const [contentType, setcontentType] = useState('-1');

  const [contentTypeDetailTrigger, contentTypeDetailResult] =
    api.useLazyGetContentTypeDetailQuery();

  const {
    data: contentTypeListData,
    error: contentTypeListError,
    isSuccess: contentTypeListSuccess,
  } = api.useGetContentTypeListQuery({
    page: 1,
    limit: 50,
  });

  const getContentTypeDetail = async (id: string) => {
    const res = await contentTypeDetailTrigger(id).unwrap();
  };

  const onChangeContentType: ChangeEventHandler<HTMLSelectElement> = async (e) => {
    setcontentType(e.currentTarget.value);
    getContentTypeDetail(e.currentTarget.value);
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

      {/* manage body field */}
      <div>
        {contentTypeDetailResult.isSuccess ? JSON.stringify(contentTypeDetailResult.data) : null}
      </div>

      <Footer />
    </main>
  );
};

export default ContentTypeManage;
