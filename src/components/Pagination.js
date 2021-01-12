import React from 'react';
import {
    Pagination
} from 'react-bootstrap';

export const viewPagination = (totalPages, currentPage, ) => {
    const items = []
    if (totalPages <= 5) {
      for (var i = 1; i <= totalPages; i++) {
        items.push(<Pagination.Item active={i !== currentPage} id={i} >{i}</Pagination.Item>);
      }
    } else if (currentPage > totalPages - 4) {
      items.push(<Pagination.Item active={currentPage !== totalPages - i} id={1}>{1}</Pagination.Item>);
      items.push(<Pagination.Ellipsis active={currentPage !== totalPages - i } disabled />);
      for (i = 5; i > 0; i--) {
        items.push(<Pagination.Item id={
          totalPages - i} active={currentPage !== totalPages - i}>{totalPages - i + 1}</Pagination.Item>);
      }
    } else if (currentPage <= 2) {
      for (i = 1; i <= 5; i++) {
        items.push(<Pagination.Item active={i !== currentPage} id={
          i}>{i + 1}</Pagination.Item>);
      }
      items.push(<Pagination.Ellipsis active={currentPage !== totalPages - i} disabled />);
      items.push(<Pagination.Item active={currentPage !== totalPages - i} id={totalPages}>{totalPages}</Pagination.Item>);
    } else {
      items.push(<Pagination.Item  id={0}>{1}</Pagination.Item>);
      items.push(<Pagination.Ellipsis disabled />);
      for (i = currentPage - 2; i < currentPage + 3; i++) {
        items.push(<Pagination.Item active={i !== currentPage} id={i} >{i}</Pagination.Item>);
      }
      items.push(<Pagination.Ellipsis disabled />);
      items.push(<Pagination.Item id={totalPages}>{totalPages}</Pagination.Item>);
    }
    return items
  }

export default viewPagination;