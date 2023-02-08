import React from 'react'
import { List } from 'antd'
import PropTypes from 'prop-types'

import './view-content.css'
import MovieCard from '../movie-card'

function ViewContent({ items, totalPages, ratedItems, addNewMovie, tabIndex }) {
  return (
    <List
      className="movie-list"
      grid={{ gutter: 10, lg: 2, xxl: 2, xl: 2, md: 2 }}
      dataSource={items}
      renderItem={(item) => (
        <List.Item className="list-item" key={item.movieId}>
          <MovieCard
            item={item}
            totalPages={totalPages}
            ratedItems={ratedItems}
            addNewMovie={(movieItem, rate) => addNewMovie(movieItem, rate)}
            tabIndex={tabIndex}
          />
        </List.Item>
      )}
    />
  )
}

ViewContent.defaultProps = {
  items: [],
}

ViewContent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
}

export default ViewContent
