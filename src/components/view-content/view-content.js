import React from 'react'
import { List } from 'antd'
import PropTypes from 'prop-types'

import './view-content.css'
import MovieCard from '../movie-card'

function ViewContent({ items }) {
  return (
    <List
      className="movie-list"
      grid={{ gutter: 10, lg: 2, xxl: 2, xl: 2, md: 2 }}
      dataSource={items}
      renderItem={(item) => (
        <List.Item className="list-item" key={item.movieId}>
          <MovieCard item={item} />
        </List.Item>
      )}
    />
  )
}

ViewContent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}
export default ViewContent
