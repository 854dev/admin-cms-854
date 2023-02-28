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
import Modal, { ModalBody, ModalFooter, ModalHeader } from 'components/Modal';

const ContentTypeManage = () => {
  const [contentType, setcontentType] = useState('-1');

  const [isContentTypeModalOpen, setIsContentTypeModalOpen] = useState(false);

  const {
    data: contentTypeListData,
    error: contentTypeListError,
    isSuccess: contentTypeListSuccess,
    refetch: contentTypeListRefetch,
  } = api.useGetContentTypeListQuery({
    page: 1,
    limit: 50,
  });

  const onChangeContentType: ChangeEventHandler<HTMLSelectElement> = async (e) => {
    setcontentType(e.currentTarget.value);
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

        {/* content type Select */}
        <div className='card mb-5 p-4'>
          <div className='mb-2 flex justify-between'>
            <h3>콘텐츠 타입 선택</h3>
            <Button
              className={'p-2 text-sm'}
              onClick={() => {
                setIsContentTypeModalOpen(true);
              }}
            >
              콘텐츠 타입 추가
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

        <FormBodyField
          contentTypeId={contentType}
          contentTypeListRefetch={contentTypeListRefetch}
        ></FormBodyField>
      </div>

      <Footer />

      <Modal
        active={isContentTypeModalOpen}
        onClose={() => {
          setIsContentTypeModalOpen(false);
        }}
        centered
      >
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>
          <div className='min-w-[300px]'>하이 헬로우</div>
        </ModalBody>
        <ModalFooter>
          <div className='flex ltr:ml-auto rtl:mr-auto'>
            <Button
              color='secondary'
              className='text-sm'
              onClick={() => setIsContentTypeModalOpen(false)}
            >
              Close
            </Button>
            <Button className='text-sm'>Save Changes</Button>
          </div>
        </ModalFooter>
      </Modal>
    </main>
  );
};

export default ContentTypeManage;
