// import Footer from 'layouts/partials/Footer';

// import Badge from 'components/Badge';
// import Breadcrumb, { BreadcrumbItem } from 'components/Breadcrumb';
// import Button from 'components/Button';
// import CustomSelect from 'components/form/CustomSelect';
// import Input from 'components/form/Input';
// import Label from 'components/form/Label';
// import Textarea from 'components/form/Textarea';
// import FormMeta from './content/FormMeta';

// import api from 'api';
// import {
//   ColumnDef,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   useReactTable,
//   createColumnHelper,
// } from '@tanstack/react-table';
// import TableComponent from 'components/Table';
// import { useParams } from 'react-router-dom';
// import { ContentBody, ContentDetail, ContentMeta } from 'types/common';
// import { useLayoutEffect, useRef, useState } from 'react';
// import FormBody from './content/FormBody';
// import { UpdateContentDto } from 'types/dto';
// import { createContentBodyFromBodyField } from 'util/util';
// import FormTag from './content/FormTag';

// const Content = () => {
//   const { contentId } = useParams();

//   const [contentDetail, setContentDetail] = useState<ContentDetail>({
//     title: '',
//     contentTypeId: -1,
//     contentTypeName: '',
//     creator: '',
//     createdAt: '2000-01-01',
//     updatedAt: '2000-01-01',
//     deletedAt: '',
//     status: 'draft',
//     body: [],
//     tags: [],
//   });

//   const contentBodyRef = useRef<{ contentBody: ContentBody[] }>({ contentBody: [] });

//   const [fetchContentDetail, contentDetailResponse] = api.useLazyGetContentDetailQuery();

//   const [triggerPatchContent, patchContentResponse] = api.usePutContentMutation();

//   const getContentDetail = async (contentId: number) => {
//     const res = (await fetchContentDetail(contentId).unwrap()) as ContentDetail;
//     setContentDetail(res);
//     contentBodyRef.current.contentBody = res.body;
//   };

//   // TODO
//   const onSubmit = async () => {
//     const param: UpdateContentDto = {
//       ...contentDetail,
//       contentId: Number(contentId) ?? '',
//       body: contentBodyRef.current.contentBody,
//     };
//     setContentDetail(param);
//     const res = await triggerPatchContent(param);
//   };

//   useLayoutEffect(() => {
//     if (contentId) {
//       getContentDetail(Number(contentId));
//     }
//   }, [contentId]);

//   return (
//     <main className='workspace'>
//       <div className='container'>
//         {/* Breadcrumb */}
//         <section className='breadcrumb'>
//           <Breadcrumb title={'Content'}>
//             <BreadcrumbItem>Content</BreadcrumbItem>
//             <BreadcrumbItem>Detail</BreadcrumbItem>
//             {contentId ? <BreadcrumbItem>{contentId}</BreadcrumbItem> : null}
//           </Breadcrumb>
//         </section>

//         <div className='p-4 mb-5 card'>
//           <h3 className='mb-4'>콘텐츠 정보</h3>
//           <FormMeta contentDetail={contentDetail} setContentDetail={setContentDetail}></FormMeta>
//         </div>

//         <div className='p-4 mb-5 card'>
//           <h3 className='mb-4'>콘텐츠 내용</h3>
//           <FormBody ref={contentBodyRef} contentBody={contentDetail.body}></FormBody>
//         </div>

//         <div className='p-4 mb-5 card'>
//           <h3 className='mb-4'>콘텐츠 태그</h3>
//           <FormTag
//             tags={contentDetail.tags}
//             onChangeTags={(tags) => {
//               setContentDetail({ ...contentDetail, tags });
//             }}
//           />
//         </div>

//         <div className='flex flex-row justify-end p-4'>
//           <Button onClick={onSubmit}>저장</Button>
//         </div>
//       </div>
//       <Footer />
//     </main>
//   );
// };

// export default Content;
import React from 'react';

function ContentDetail() {
  return <div>ContentDetail</div>;
}

export default ContentDetail;
