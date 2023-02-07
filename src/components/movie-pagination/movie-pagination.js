import React from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'antd'
import './movie-pagination.css'

class MoviePagination extends React.Component {
  onChange = (page) => {
    this.props.onChangePage(page)
  }

  render() {
    const { pageNumber, totalPages, ratedItems, tabIndex } = this.props

    const numberOfPages = tabIndex === 1 ? totalPages : ratedItems.length

    return (
      <Pagination
        className="movie-pagination"
        current={pageNumber}
        onChange={this.onChange}
        total={numberOfPages}
        pageSize={20}
        showSizeChanger={false}
      />
    )
  }
}

MoviePagination.propTypes = {
  onChangePage: PropTypes.func,
  pageNumber: PropTypes.number.isRequired,
}

MoviePagination.defaultProps = {
  onChangePage: () => {},
}

export default MoviePagination
