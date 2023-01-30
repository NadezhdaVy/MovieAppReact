import React from 'react'
import { Tabs } from 'antd'

import { AllMovies, RatedMovies } from '../movie-components/movie-components'
// import MovieList from '../movie-list'
import './movie-tabs.css'
// import RatedMovies from '../rated-movies'
// import { MovieServiceConsumer } from '../movie-service-context'

export default class MovieTabs extends React.Component {
  state = {
    tabIndex: 1,
  }

  onChange = (key) => {
    this.setState({ tabIndex: Number(key) })
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
            children: <AllMovies tabIndex={this.state.tabIndex} />,
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
