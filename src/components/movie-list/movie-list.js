import React from 'react'
import { Card, List, Tag, Alert, Layout } from 'antd'
import { Offline, Online } from 'react-detect-offline'

import './movie-list.css'
import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner'

const { Meta } = Card
const { Content } = Layout

export default class MovieList extends React.Component {
  render() {
    const { error, isLoaded, items } = this.props

    const hasData = !(!isLoaded || error)
    const errorMsg = error ? <ErrorIndicator err={error} /> : null
    const loading = !isLoaded ? <Spinner /> : null
    const content = hasData ? <ViewContent items={items} /> : null

    return (
      <Content className="movie-content">
        <Online>
          {errorMsg}
          {loading}
          {content}
        </Online>
        <Offline>
          <Alert className="offline-msg" message="You are currently offline!" type="warning" showIcon />
          {content}
        </Offline>
      </Content>
    )
  }
}

function ViewContent({ items }) {
  return (
    <List
      className="movie-list"
      grid={{ gutter: 16, column: 2 }}
      dataSource={items}
      renderItem={(item) => (
        <List.Item>
          <Card
            className="movie-item"
            hoverable
            cover={<img className="movie-avatar" alt="example" src={`https://image.tmdb.org/t/p/w500/${item.cover}`} />}
          >
            <Meta
              className="item-body"
              title={item.title}
              description={
                <div>
                  <div className="date">{item.releaseDate}</div>
                  <div className="movie-genre">
                    <Tag className="genre" color="magenta">
                      <a href="#top">magenta</a>
                    </Tag>
                    <Tag className="genre" color="magenta">
                      <a href="#top">magenta</a>
                    </Tag>
                  </div>
                  <p className="movie-description">{item.overview}</p>
                </div>
              }
            />
          </Card>
        </List.Item>
      )}
    />
  )
}
