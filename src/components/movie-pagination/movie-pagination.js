import React from 'react'
import { Pagination } from 'antd'
import './movie-pagination.css'

function MoviePagination({ onChangePage, pageNumber }) {
  const onChange = (page) => {
    onChangePage(page)
  }
  return (
    <Pagination
      className="movie-pagination"
      current={pageNumber}
      onChange={onChange}
      total={500}
      showSizeChanger={false}
    />
  )
}

export default MoviePagination
