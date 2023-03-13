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
import { ContentBodyWithName, ContentDetail, ContentType, ID } from 'types/common';
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
import { createContentBodyFromBodyField } from 'util/util';
import { useDispatch } from 'react-redux';
import { setAlert } from 'features/alertSlice';
import FormTag from './content/FormTag';

const ContentAdd = () => {
  const location = useLocation();

  const contentBodyRef = useRef<{ contentBody: ContentBodyWithName[] }>({ contentBody: [] });

  const dispatch = useDispatch();

  const [contentType, setcontentType] = useState<number>();

  const [contentBody, setContentBody] = useState<ContentBodyWithName[]>([]);

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

  const [contentDetail, setContentDetail] = useState<ContentDetail>({
    title: '',
    contentTypeId: -1,
    contentTypeName: '',
    creator: '',
    createdAt: '2000-01-01',
    updatedAt: '2000-01-01',
    deletedAt: '',
    status: 'draft',
    body: [],
    tags: [],
  });

  const onChangeContentType = async (contentTypeId: ID, contentTypeName: string) => {
    setcontentType(contentTypeId);
    getContentTypeDetail(contentTypeId);
  };

  const getContentTypeDetail = async (id: ID) => {
    const res = await contentTypeDetailTrigger(Number(id)).unwrap();
    const contentBody = createContentBodyFromBodyField(res.bodySchema);
    contentBodyRef.current.contentBody = contentBody;
    setContentBody(contentBody);
  };

  const onSubmit = async () => {
    const param = {
      ...contentDetail,
      body: contentBodyRef.current.contentBody,
    };
    setContentBody(contentBodyRef.current.contentBody);
    const res = await postContentTrigger(param);

    dispatch(
      setAlert({
        title: '등록 완료',
        color: 'success',
        dismissable: true,
        outlined: false,
      })
    );
  };

  /** 컨텐츠 타입 페칭 후  1번쨰 선택. 이전페이지에서 넘어왔다면 이미 선택되어 있음 */
  useEffect(() => {
    if (contentTypeListSuccess && contentTypeListData.data.length > 0) {
      const contentTypeIdLocation = location.state?.contentTypeId;

      const selectedContentType = contentTypeIdLocation
        ? (contentTypeListData.data.find(
            (elem) => elem.contentTypeId === contentTypeIdLocation
          ) as ContentType)
        : contentTypeListData.data[0];

      setcontentType(selectedContentType.contentTypeId);
      setContentDetail({ ...contentDetail, ...selectedContentType });
      getContentTypeDetail(selectedContentType.contentTypeId);
    }
  }, [contentTypeListSuccess, contentTypeListIsFetching]);

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
          <CustomSelect
            name='contentTypeSelect'
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              const option = e.currentTarget.options[e.currentTarget.options.selectedIndex]
                .dataset as { contentTypeId: string; contentTypeName: string };
              onChangeContentType(Number(option.contentTypeId), option.contentTypeName);
            }}
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

        <div className='card mb-5 p-4'>
          <h3 className='mb-4'>콘텐츠 정보</h3>
          <FormMeta contentDetail={contentDetail} setContentDetail={setContentDetail}></FormMeta>
        </div>

        <div className='card mb-5 p-4'>
          <h3 className='mb-4'>콘텐츠 내용</h3>
          <FormBody ref={contentBodyRef} contentBody={contentBody}></FormBody>
        </div>

        <div className='card mb-5 p-4'>
          <h3 className='mb-4'>콘텐츠 태그</h3>
          <FormTag
            tags={contentDetail.tags}
            onChangeTags={(tags) => {
              setContentDetail({ ...contentDetail, tags });
            }}
          />
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
