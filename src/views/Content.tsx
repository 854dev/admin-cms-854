import Footer from 'layouts/partials/Footer';

// import LineWithAnnotationChart from 'components/charts/LineWithAnnotationChart';
// import Area from 'components/charts/Area';
import Badge from 'components/Badge';
import Breadcrumb, { BreadcrumbItem } from 'components/Breadcrumb';
import CustomSelect from 'components/form/CustomSelect';
import Input from 'components/form/Input';
import Label from 'components/form/Label';
// import PolarArea from 'components/charts/PolarArea';
import Textarea from 'components/form/Textarea';

// import DataChartJS from 'data/chartjs';

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
import { Link, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { ContentType } from 'types/common';
import { apiThenShowMessage, parseDate } from 'util/util';

const Content = () => {
  const [contentType, setcontentType] = useState<number>();

  const { data, isFetching } = api.useGetContentListQuery(
    {
      page: 1,
      limit: 10,
      contentTypeId: contentType ?? -1,
    },
    {
      skip: false,
      refetchOnMountOrArgChange: true,
    }
  );

  const [deleteContentTrigger, deleteContentResult] = api.useDeleteContentMutation();

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

  const onClickIdBadge = (id: string) => {
    alert(id);
  };

  const onClickDeleteBadge = async (id: string) => {
    if (confirm('진짜 삭제?')) {
      apiThenShowMessage(deleteContentTrigger(Number(id)).unwrap());
    }
  };

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('contentId', {
      header: 'contentId',
      cell: (info) => (
        <div className='flex flex-row justify-center gap-8'>
          {info.getValue()}
          <Link to={`/content/${info.getValue()}`}>
            <Badge
              className={'cursor-pointer'}
              onClick={() => {
                onClickIdBadge(info.getValue());
              }}
            >
              수정
            </Badge>
          </Link>

          <div
            onClick={() => {
              onClickDeleteBadge(info.getValue());
            }}
          >
            <Badge className={'cursor-pointer bg-danger'}>삭제</Badge>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('title', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('creator', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('createdAt', {
      cell: (info) => parseDate(info.getValue()),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('updatedAt', {
      cell: (info) => parseDate(info.getValue()),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('status', {
      cell: (info) => (
        <>
          {info.getValue() === 'draft' ? (
            <span className='badge badge_secondary'>{info.getValue()}</span>
          ) : (
            <span className='badge badge_primary'>{info.getValue()}</span>
          )}
        </>
      ),
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data: data ? data.data : [],
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const onChangeContentType: ChangeEventHandler<HTMLSelectElement> = async (e) => {
    setcontentType(Number(e.currentTarget.value));
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
          <h1>Content</h1>
        </section>

        <div className='mb-4 flex flex-row items-center justify-between'>
          <Link to='/content/add' state={{ contentTypeId: contentType }}>
            <Button className='px-4 py-1 text-lg'>
              <span>게시글 작성</span>
            </Button>
          </Link>

          {/* content type Select */}
          <div className='mb-5 w-48'>
            <div className='mb-2 flex justify-between'>
              <p>콘텐츠 타입 이름</p>
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
        </div>

        <div className='card p-4'>
          <div className='flex'>
            {data ? <TableComponent table={table} className='w-full'></TableComponent> : null}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Content;
