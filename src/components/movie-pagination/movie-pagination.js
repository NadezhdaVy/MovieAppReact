import React from 'react'
import PropTypes from 'prop-types'
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

MoviePagination.propTypes = {
  onChangePage: PropTypes.func,
  pageNumber: PropTypes.number.isRequired,
}

MoviePagination.defaultProps = {
  onChangePage: () => {},
}

export default MoviePagination
