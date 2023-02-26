import Footer from 'layouts/partials/Footer';

import Badge from 'components/Badge';
import Breadcrumb, { BreadcrumbItem } from 'components/Breadcrumb';
import Button from 'components/Button';
import CustomSelect from 'components/form/CustomSelect';
import Input from 'components/form/Input';
import Label from 'components/form/Label';
import Textarea from 'components/form/Textarea';
import FormMeta from './content/FormMeta';

import api from 'api';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table';
import TableComponent from 'components/Table';
import { useParams } from 'react-router-dom';
import { ContentBody, ContentMeta } from 'types/common';
import { useLayoutEffect, useRef, useState } from 'react';
import FormBody from './content/FormBody';

const Content = () => {
  const { contentId } = useParams();

  const [contentMeta, setContentMeta] = useState<ContentMeta>({
    title: '',
    creator: '',
    createdAt: '2000-01-01',
    updatedAt: '2000-01-01',
    deletedAt: '',
    status: 'draft',
  });

  const [contentBody, setContentBody] = useState<ContentBody[]>([]);

  const contentBodyRef = useRef<{ contentBody: ContentBody[] }>({ contentBody: [] });

  const [fetchContentDetail, contentDetailResponse] = api.useLazyGetContentDetailQuery();

  const getContentDetail = async (contentId: number) => {
    const res = await fetchContentDetail(contentId).unwrap();
    setContentMeta({ ...res, body: undefined });
    setContentBody(res.body);
  };

  // TODO
  const onSubmit = () => {
    const param = {
      ...contentMeta,
      body: contentBodyRef.current.contentBody,
    };
    console.log(param);
  };

  useLayoutEffect(() => {
    if (contentId) {
      getContentDetail(Number(contentId));
    }
  }, [contentId]);

  return (
    <main className='workspace'>
      <div className='container'>
        {/* Breadcrumb */}
        <section className='breadcrumb'>
          <Breadcrumb title={'Content'}>
            <BreadcrumbItem>Content</BreadcrumbItem>
            <BreadcrumbItem>Detail</BreadcrumbItem>
            {contentId ? <BreadcrumbItem>{contentId}</BreadcrumbItem> : null}
          </Breadcrumb>
        </section>

        <div className='card mb-5 p-4'>
          <h3 className='mb-4'>콘텐츠 정보</h3>
          <FormMeta contentMeta={contentMeta} setContentMeta={setContentMeta}></FormMeta>
        </div>

        <div className='card p-4'>
          <h3 className='mb-4'>콘텐츠 내용</h3>
          {contentDetailResponse.data ? (
            <>
              <FormBody ref={contentBodyRef} contentBody={contentBody ?? []}></FormBody>
            </>
          ) : null}
        </div>

        <div className='flex flex-row justify-end p-4'>
          <Button onClick={onSubmit}>저장</Button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Content;
