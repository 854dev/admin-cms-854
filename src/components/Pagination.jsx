import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import Dropdown from 'components/Dropdown';

import usePagination, { dots } from 'utilities/hooks/usePagination';

const Pagination = (props) => {
  const {
    currentPage,
    totalCount,
    siblingCount = 1,
    showFirst = false,
    showLast = false,
    pageSize,
    className,
    onPageChange,
    onPageSizeChange,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  const pageSizes = [5, 10, 15];

  const changePage = (page) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const changePagSize = (size) => {
    if (onPageSizeChange) {
      onPageSizeChange(size);
    }
  };

  const next = () => {
    if (onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  const previous = () => {
    if (onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className={classNames('card', 'lg:flex', className)}>
      <nav className='flex flex-wrap items-center gap-2 p-5'>
        <Button color='secondary' disabled={currentPage === 1} onClick={previous}>
          Prev
        </Button>
        {showFirst ? (
          <Button color={currentPage === 1 ? 'primary' : 'secondary'} onClick={() => changePage(1)}>
            First
          </Button>
        ) : null}
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === dots) {
            return <span key={index} className='la la-ellipsis-h text-2xl'></span>;
          }

          return (
            <Button
              key={index}
              color={pageNumber === currentPage ? 'primary' : 'secondary'}
              outlined={pageNumber === currentPage ? false : true}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}
        {showLast ? (
          <Button
            color={currentPage === lastPage ? 'primary' : 'secondary'}
            onClick={() => changePage(lastPage)}
          >
            Last
          </Button>
        ) : null}
        <Button color='secondary' disabled={currentPage === lastPage} onClick={next}>
          Next
        </Button>
      </nav>
      <div className='flex items-center border-t border-divider p-5 ltr:ml-auto rtl:mr-auto lg:border-t-0'>
        Displaying {(currentPage - 1) * pageSize + 1}-{currentPage * pageSize} of {totalCount} items
      </div>
      <div className='flex items-center gap-2 border-t border-divider p-5 lg:border-t-0 lg:ltr:border-l lg:rtl:border-r'>
        <span>Show</span>
        <Dropdown
          content={
            <div className='dropdown-menu'>
              {pageSizes.map((size) => (
                <button key={size} onClick={() => changePagSize(size)}>
                  {size}
                </button>
              ))}
            </div>
          }
        >
          <Button color='secondary' outlined className='uppercase'>
            {pageSize}
            <span className='la la-caret-down text-xl leading-none ltr:ml-3 rtl:mr-3'></span>
          </Button>
        </Dropdown>
        <span>items</span>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalCount: PropTypes.number,
  siblingCount: PropTypes.number,
  showFirst: PropTypes.bool,
  showLast: PropTypes.bool,
  pageSize: PropTypes.number,
  className: PropTypes.string,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
};

export default Pagination;
