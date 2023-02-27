import Footer from 'layouts/partials/Footer';

import Badge from 'components/Badge';
import Breadcrumb, { BreadcrumbItem } from 'components/Breadcrumb';
import Button from 'components/Button';
import Input from 'components/form/Input';
import Label from 'components/form/Label';
import Textarea from 'components/form/Textarea';
import FormMeta from './content/FormMeta';

import api from 'api';
import TableComponent from 'components/Table';
import { useParams } from 'react-router-dom';
import { ContentBody, ContentMeta, ContentType } from 'types/common';
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import FormBody from './content/FormBody';
import Dropdown from 'components/Dropdown';
import CustomSelect from 'components/form/CustomSelect';

const ContentAdd = () => {
  const contentBodyRef = useRef<{ contentBody: ContentBody[] }>({ contentBody: [] });

  const [contentType, setcontentType] = useState('-1');

  const [contentBody, setContentBody] = useState<ContentBody[]>([]);

  const {
    data: contentTypeListData,
    error: contentTypeListError,
    isSuccess: contentTypeListSuccess,
  } = api.useGetContentTypeListQuery({
    page: 1,
    limit: 50,
  });

  const [contentTypeDetailTrigger, contentTypeDetailResult] =
    api.useLazyGetContentTypeDetailQuery();

  const [contentMeta, setContentMeta] = useState<ContentMeta>({
    title: '',
    creator: '',
    createdAt: '2000-01-01',
    updatedAt: '2000-01-01',
    deletedAt: '',
    status: 'draft',
  });

  const onChangeContentType: ChangeEventHandler<HTMLSelectElement> = async (e) => {
    getContentTypeDetail(e.currentTarget.value);
  };

  const getContentTypeDetail = async (id: string) => {
    const res = await contentTypeDetailTrigger(id).unwrap();
    console.log(res);
    // contentBodyRef.current.contentBody = res;
    console.log(contentBodyRef.current.contentBody);
  };

  const onSubmit = () => {
    console.log('first');
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
          <Breadcrumb title={'Content'}>
            <BreadcrumbItem>Content</BreadcrumbItem>
            <BreadcrumbItem>Add</BreadcrumbItem>
          </Breadcrumb>
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

        <div className='card mb-5 p-4'>
          <h3 className='mb-4'>콘텐츠 정보</h3>
          <FormMeta contentMeta={contentMeta} setContentMeta={setContentMeta}></FormMeta>
        </div>

        <div className='card p-4'>
          <h3 className='mb-4'>콘텐츠 내용</h3>
          {JSON.stringify(
            contentTypeDetailResult.isSuccess ? contentTypeDetailResult.data.bodyField : 'ㅗ'
          )}
          {/* <FormBody
            ref={contentBodyRef}
            contentBody={contentBodyRef.current.contentBody}
          ></FormBody> */}
        </div>

        <div className='flex flex-row justify-end p-4'>
          <Button onClick={onSubmit}>저장</Button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ContentAdd;
