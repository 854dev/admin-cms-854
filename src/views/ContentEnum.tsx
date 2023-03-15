import Breadcrumb, { BreadcrumbItem } from 'components/Breadcrumb';
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

        <div className='card'>
          <ul>
            <li>1</li>
            <li>2</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default ContentEnum;
