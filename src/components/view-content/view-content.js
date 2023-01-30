import React from 'react'
import { List } from 'antd'

import MovieCard from '../movie-card'

function ViewContent({ items, loading }) {
  return (
    <List
      className="movie-list"
      grid={{ gutter: 16, column: 2 }}
      dataSource={items}
      renderItem={(item) => (
        <List.Item className="list-item" key={item.movieId}>
          <MovieCard loading={loading} item={item} />
        </List.Item>
      )}
    />
  )
}
export default ViewContent
