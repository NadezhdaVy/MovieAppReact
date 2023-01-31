import React from 'react'
import { Tabs } from 'antd'

import { AllMovies, RatedMovies } from '../movie-components/movie-components'

import './movie-tabs.css'

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
        tabBarGutter={30}
        size="large"
        tabBarStyle={{ width: '150px', margin: '0 auto', marginBottom: '1em' }}
        className="movie-tabs"
        defaultActiveKey="1"
        disabled
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
