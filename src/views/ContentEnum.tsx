import Breadcrumb, { BreadcrumbItem } from 'components/Breadcrumb';
import Button from 'components/Button';
import React, { useState } from 'react';

function ContentEnum() {
  const [currntEnumName, setCurrentEnumName] = useState('');

  return (
    <main className='workspace'>
      <div className='container'>
        {/* Breadcrumb */}
        <section className='breadcrumb'>
          <Breadcrumb title={'Content'}>
            <BreadcrumbItem>Content</BreadcrumbItem>
            <BreadcrumbItem>Enum</BreadcrumbItem>
          </Breadcrumb>
        </section>

        <div className='w-full overflow-y-scroll'>
          <div className='card min-h-[20rem] p-2'>
            <div className='grid grid-flow-col gap-4'>
              <table className='grid-col-4 table_hoverable table w-full table-auto'>
                <thead>
                  <th>이름</th>
                </thead>
                <tbody>
                  <tr className={currntEnumName === 'reaction' ? 'bg-gray-100 text-primary' : ''}>
                    <td>게시물반응</td>
                  </tr>
                  <tr className={currntEnumName === 'chinafood' ? 'bg-gray-100 text-primary' : ''}>
                    <td>중식메뉴</td>
                  </tr>
                </tbody>
              </table>

              <div className='grid-col-1 border-l-2 p-1'></div>

              <table className='grid-col-4 table_hoverable table w-full table-auto'>
                <thead>
                  <th>값 목록</th>
                </thead>
                <tbody>
                  <tr className={currntEnumName === 'reaction' ? 'bg-gray-100 text-primary' : ''}>
                    <td>게시물반응</td>
                  </tr>
                  <tr className={currntEnumName === 'chinafood' ? 'bg-gray-100 text-primary' : ''}>
                    <td>중식메뉴</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContentEnum;
