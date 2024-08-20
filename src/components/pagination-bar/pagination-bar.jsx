import React from 'react';
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';

import './pagination-bar.scss';

const PaginationBar = ({ currentPage = 1, articlesCount }) => {
  const navigate = useNavigate();

  const onChange = (e) => {
    navigate(`/articles/page/${e}`);
  };

  return (
    <Pagination
      current={currentPage}
      total={articlesCount}
      defaultPageSize={5}
      className="pagination"
      onChange={onChange}
      hideOnSinglePage
      align="center"
      showSizeChanger={false}
    />
  );
};
export default PaginationBar;
