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

const Content = () => {
  const { data, isFetching } = api.useGetContentListQuery({
    page: 1,
    limit: 10,
  });

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor('title', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('creator', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('createdAt', {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('updatedAt', {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('status', {
      cell: (info) => info.getValue(),
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

  return (
    <main className='workspace'>
      <div className='container'>
        {/* Breadcrumb */}
        <section className='breadcrumb'>
          <h1>Content</h1>
        </section>

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
