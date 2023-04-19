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
import { useLocation, useParams } from 'react-router-dom';
import { ContentDetail, ContentType, ID } from 'types/common';
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import FormBody from './content/ContentForm';
import Dropdown from 'components/Dropdown';
import CustomSelect from 'components/form/CustomSelect';
import { createContentBodyFromBodyField } from 'util/util';
import { useDispatch } from 'react-redux';
import { setAlert } from 'features/alertSlice';
import FormTag from './content/FormTag';
import ContentForm from './content/ContentForm';
import ReactQuill from 'react-quill';

const contentDetailDefault: ContentDetail = {
  title: '',
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
  const location = useLocation();

  const dispatch = useDispatch();

  const [contentType, setcontentType] = useState<number>();

  const {
    data: contentTypeListData,
    error: contentTypeListError,
    isSuccess: contentTypeListSuccess,
    isFetching: contentTypeListIsFetching,
  } = api.useGetContentTypeListQuery({
    page: 1,
    limit: 50,
  });

  const [contentTypeDetailTrigger, contentTypeDetailResult] =
    api.useLazyGetContentTypeDetailQuery();

  const [postContentTrigger, postContentResult] = api.usePostContentMutation();

  const [contentDetail, setContentDetail] = useState<ContentDetail>(contentDetailDefault);

  // const onChangeContentType = async (contentTypeId: ID, contentTypeName: string) => {
  //   setcontentType(contentTypeId);
  //   getContentTypeDetail(contentTypeId);
  // };

  // const getContentTypeDetail = async (id: ID) => {
  //   const res = await contentTypeDetailTrigger(Number(id)).unwrap();
  //   const contentBody = createContentBodyFromBodyField(res.bodySchema);
  //   contentBodyRef.current.contentBody = contentBody;
  //   setContentBody(contentBody);
  // };

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    setContentDetail((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onSubmit = async () => {
    const param = {
      ...contentDetail,
    };

    // const param = {
    //   ...contentDetail,
    //   body: contentBodyRef.current.contentBody,
    // };
    // setContentBody(contentBodyRef.current.contentBody);
    // const res = await postContentTrigger(param);
    // dispatch(
    //   setAlert({
    //     title: '등록 완료',
    //     color: 'success',
    //     dismissable: true,
    //     outlined: false,
    //   })
    // );
  };

  /** 컨텐츠 타입 페칭 후  1번쨰 선택. 이전페이지에서 넘어왔다면 이미 선택되어 있음 */
  // useEffect(() => {
  //   if (contentTypeListSuccess && contentTypeListData.data.length > 0) {
  //     const contentTypeIdLocation = location.state?.contentTypeId;

  //     const selectedContentType = contentTypeIdLocation
  //       ? (contentTypeListData.data.find(
  //           (elem) => elem.contentTypeId === contentTypeIdLocation
  //         ) as ContentType)
  //       : contentTypeListData.data[0];

  //     setcontentType(selectedContentType.contentTypeId);
  //     setContentDetail({ ...contentDetail, ...selectedContentType });
  //     getContentTypeDetail(selectedContentType.contentTypeId);
  //   }
  // }, [contentTypeListSuccess, contentTypeListIsFetching]);

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
                  콘텐츠 타입 선택
                </Label>
                <CustomSelect
                  className={'mb-2'}
                  name='contentTypeSelect'
                  // onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  //   const option = e.currentTarget.options[e.currentTarget.options.selectedIndex]
                  //     .dataset as { contentTypeId: string; contentTypeName: string };
                  //   onChangeContentType(Number(option.contentTypeId), option.contentTypeName);
                  // }}
                >
                  {contentTypeListData ? (
                    <>
                      {contentTypeListData.data.map((elem: ContentType) => (
                        <option
                          selected={elem.contentTypeId === contentType}
                          key={elem.contentTypeId}
                          value={elem.contentTypeId}
                          data-content-type-id={elem.contentTypeId}
                          data-content-type-name={elem.contentTypeName}
                        >
                          {elem.contentTypeName}
                        </option>
                      ))}
                    </>
                  ) : null}
                </CustomSelect>
              </div>
              {/* content meta */}
              <div className='mb-5 sm:w-full xl:w-1/2'>
                <Label className='mb-2 block' htmlFor='title'>
                  Title
                </Label>
                <Input id='title' name='title' type='text' />
              </div>
              <div className='mb-5 sm:w-full xl:w-1/2'>
                <Label className='mb-2 block' htmlFor='author'>
                  Author
                </Label>
                <Input id='author' name='author' type='text' />
              </div>
              <div className='mb-5 sm:w-full xl:w-1/2'>
                <Label className='mb-2 block' htmlFor='description'>
                  Description
                </Label>
                <Input id='description' name='description' type='text' />
              </div>
              <div className='mb-5 sm:w-full xl:w-1/2'>
                <Label className='mb-2 block' htmlFor='status'>
                  Status
                </Label>
                <Button
                  className={`mb-2 text-sm ${
                    contentDetail.status === 'draft' ? 'bg-primary' : 'bg-secondary'
                  }`}
                >
                  draft
                </Button>
                <Button
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

              {/* content body */}
              <div className='w-full'>
                <Label className='mb-2 block' htmlFor='excerpt'>
                  야발년들아
                </Label>
                <div className='mt-5 min-h-[23rem]'>
                  <ReactQuill
                    className='h-[17rem] w-full'
                    theme='snow'
                    onChange={(content, delta, source, editor) => {
                      editor.getHTML();
                    }}
                  ></ReactQuill>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ContentForm contentDetail={contentDetail} onSubmit={onSubmit}></ContentForm>
      </div>
      <Footer />
    </main>
  );
};

export default ContentAdd;
