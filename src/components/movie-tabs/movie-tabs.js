import React from 'react'
import { Tabs } from 'antd'

import MovieList from '../movie-list'
import './movie-tabs.css'
import RatedMovies from '../rated-movies'

export default class MovieTabs extends React.Component {
  state = {
    tabIndex: 1,
  }

  onChange = (key) => {
    this.setState({ tabIndex: key })
  }

  render() {
    return (
      <Tabs
        className="movie-tabs"
        defaultActiveKey="1"
        centered
        onChange={this.onChange}
        items={[
          {
            label: 'Search',
            key: '1',
            children: <MovieList />,
          },
          {
            label: 'Rated',
            key: '2',
            children: <RatedMovies tabIndex={this.state.tabIndex} />,
          },
        ]}
      />
    )
  }
}
