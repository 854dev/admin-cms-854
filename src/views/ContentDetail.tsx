import Footer from 'layouts/partials/Footer';

import Breadcrumb, { BreadcrumbItem } from 'components/Breadcrumb';
import Button from 'components/Button';
import Input from 'components/form/Input';
import Label from 'components/form/Label';

import api from 'api';
import { useParams } from 'react-router-dom';
import { ContentBodySchema, ContentDetail, ContentType, ID } from 'types/common';
import React, { ChangeEvent, useEffect, useState } from 'react';
import CustomSelect from 'components/form/CustomSelect';
import { useDispatch } from 'react-redux';
import { setAlert } from 'features/alertSlice';
import ReactQuill from 'react-quill';

const contentDetailDefault: ContentDetail = {
  title: '',
  description: '',
  contentTypeId: -1,
  contentTypeName: '',
  creator: '',
  createdAt: '-',
  updatedAt: '-',
  deletedAt: '',
  status: 'draft',
  body: {},
  tags: [],
};

const ContentAdd = () => {
  const contentId = useParams().contentId;

  const dispatch = useDispatch();

  const [fetchContentDetail, contentDetailResponse] = api.useLazyGetContentDetailQuery();

  const [contentTypeDetailTrigger, contentTypeDetailResult] =
    api.useLazyGetContentTypeDetailQuery();

  const [triggerPatchContent, patchContentResponse] = api.usePutContentMutation();

  const [contentDetail, setContentDetail] = useState<ContentDetail>(contentDetailDefault);

  const [contentBodySchema, setContentBodySchema] = useState<ContentBodySchema[]>([]);

  const handleContentDetailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name as keyof ContentDetail;
    const value = event.target.value;

    setContentDetail((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleBodyChange = (key: string, value: string) => {
    setContentDetail((prevState) => ({
      ...prevState,
      body: { ...prevState.body, [key]: value },
    }));
  };

  const onSubmit = async () => {
    try {
      const res = triggerPatchContent({
        ...contentDetail,
        contentId: Number(contentId) ?? -1,
      })
        .unwrap()
        .then((response) => {
          dispatch(
            setAlert({
              title: `성공 : ${response.message}`,
              color: 'success',
              dismissable: true,
              outlined: false,
            })
          );
        });
    } catch (e) {
      dispatch(
        setAlert({
          title: `rejected`,
          color: 'danger',
          dismissable: true,
          outlined: false,
        })
      );
    }
  };

  const getContentDetail = async (contentId: number) => {
    const res = (await fetchContentDetail(contentId).unwrap()) as ContentDetail;
    const contentTypeDetailRes = await contentTypeDetailTrigger(Number(res.contentTypeId)).unwrap();

    setContentBodySchema(contentTypeDetailRes.contentBodySchema);
    setContentDetail(res);
  };

  useEffect(() => {
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
            <BreadcrumbItem>Add</BreadcrumbItem>
          </Breadcrumb>
        </section>

        {/* content type Select */}
        <div className='relative mb-5 p-4'>
          {/* Content */}
          <div className='lg:col-span-2 xl:col-span-3'>
            <div className='card p-5'>
              <div className='mb-5 sm:w-full xl:w-1/2'>
                <Label className='mb-2 block' htmlFor='contentTypeSelect'>
                  콘텐츠 타입
                </Label>
                <CustomSelect className={'disabled mb-2'} name='contentTypeSelect'>
                  <option>{contentDetail.contentTypeName}</option>
                </CustomSelect>
              </div>

              <hr className='mb-3' />

              {/* content meta */}
              <div className='mb-5 sm:w-full xl:w-1/2'>
                <Label className='mb-2 block' htmlFor='title'>
                  Title
                </Label>
                <Input
                  id='title'
                  name='title'
                  type='text'
                  onChange={handleContentDetailChange}
                  value={contentDetail.title}
                />
              </div>
              <div className='mb-5 sm:w-full xl:w-1/2'>
                <Label className='mb-2 block' htmlFor='creator'>
                  Creator
                </Label>
                <Input
                  id='creator'
                  name='creator'
                  type='text'
                  onChange={handleContentDetailChange}
                  value={contentDetail.creator}
                />
              </div>
              <div className='mb-5 sm:w-full xl:w-1/2'>
                <Label className='mb-2 block' htmlFor='description'>
                  Description
                </Label>
                <Input
                  id='description'
                  name='description'
                  type='text'
                  onChange={handleContentDetailChange}
                  value={contentDetail.description}
                />
              </div>
              <div className='mb-5 sm:w-full xl:w-1/2'>
                <Label className='mb-2 block' htmlFor='status'>
                  Status
                </Label>
                <Button
                  onClick={handleContentDetailChange}
                  name='status'
                  value='draft'
                  className={`mb-2 text-sm ${
                    contentDetail.status === 'draft' ? 'bg-primary' : 'bg-secondary'
                  }`}
                >
                  draft
                </Button>
                <Button
                  onClick={handleContentDetailChange}
                  name='status'
                  value='publish'
                  className={`mb-2 text-sm ${
                    contentDetail.status === 'publish' ? 'bg-primary' : 'bg-secondary'
                  }`}
                >
                  publish
                </Button>
              </div>
              <div className='mb-5 sm:w-full xl:w-1/2'>
                <Label className='mb-2 block' htmlFor='title'>
                  createdAt : {contentDetail.createdAt}
                </Label>
                <Label className='mb-2 block' htmlFor='title'>
                  updatedAt : {contentDetail.updatedAt}
                </Label>
              </div>

              <hr className='mb-3' />

              {/* content body */}
              <div className='w-full'>
                {contentBodySchema.map((elem) => {
                  return (
                    <React.Fragment key={elem.schemaName}>
                      <Label className='mb-2 block' htmlFor='title'>
                        {elem.schemaName}
                      </Label>

                      {elem.schemaType === 'string' ? (
                        <Input
                          id={elem.schemaName}
                          name={elem.schemaName}
                          defaultValue={contentDetail.body[elem.schemaName]}
                          type='text'
                          onChange={(e) => {
                            handleBodyChange(elem.schemaName, e.currentTarget.value);
                          }}
                        />
                      ) : null}

                      {elem.schemaType === 'text' ? (
                        <div className='mt-5 min-h-[23rem]'>
                          <ReactQuill
                            className='h-[17rem] w-full'
                            defaultValue={contentDetail.body[elem.schemaName]}
                            theme='snow'
                            onChange={(content, delta, source, editor) => {
                              handleBodyChange(elem.schemaName, editor.getHTML());
                            }}
                          ></ReactQuill>
                        </div>
                      ) : null}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className='my-1 text-right'>
          <Button onClick={onSubmit} name='submit'>
            Submit
          </Button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ContentAdd;
