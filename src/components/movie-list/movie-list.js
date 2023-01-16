import React from 'react'
import { Card, List, Tag, Layout, Alert } from 'antd'
import { Offline, Online } from 'react-detect-offline'

import './movie-list.css'
import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner'

const { Meta } = Card
const { Header, Footer, Content } = Layout
export default class MovieList extends React.Component {
  render() {
    const { error, isLoaded, items } = this.props

    const hasData = !(!isLoaded || error)
    const errorMsg = error ? <ErrorIndicator /> : null
    const loading = !isLoaded ? <Spinner /> : null
    const content = hasData ? <ViewContent items={items} /> : null

    return (
      <Layout className="app-layout">
        <Header>Header</Header>
        <Content className="movie-content">
          <Online>
            {errorMsg}
            {loading}
            {content}
          </Online>
          <Offline>
            <Alert className="offline-msg" message="You are currently offline!" type="warning" showIcon />
            {/* <div className="offline-msg">You are currently offline!</div> */}
          </Offline>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    )
  }
}

function ViewContent({ items }) {
  return (
    <List
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

// export default MovieList

/* MoviesView = ({ items }) =></> {
  return (
    <React.Fragment>
      <React.Fragment /></>
  )
} */

/* <List itemLayout="vertical" className="movie-list" grid=
	 {{
		gutter: 8,
		column: 2,
	 }}
	 dataSource={items}
	 renderItem=
	 {(item) => (
		<List.Item>
				<Card
					className="movie-item"
					hoverable
					cover={<img className="movie-avatar" alt="example" src={`https://image.tmdb.org/t/p/w500/${item.cover}`} />}
				>
					<Meta
						className="item-body"
						title={item.title}
						description={<div>
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
						</div>} />
				</Card>
				)}
			</List.Item> />
	 )} */
