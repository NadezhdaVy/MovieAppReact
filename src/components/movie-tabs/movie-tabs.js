import React from 'react'
import { Tabs } from 'antd'

import MovieList from '../movie-list'
import MovieService from '../../services/movie-service'
import './movie-tabs.css'

export default class MovieTabs extends React.Component {
  movieService = new MovieService()

  state = {
    tabIndex: 1,
  }

  onChange = (key) => {
    this.setState({ tabIndex: Number(key) })
  }

  render() {
    const { getResource, getRatedMovies } = this.movieService

    return (
      <Tabs
        destroyInactiveTabPane
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
            children: (
              <MovieList
                tabIndex={this.state.tabIndex}
                getData={getResource}
                ratedItems={this.props.ratedItems}
                isLoaded={this.props.isLoaded}
                addNewMovie={(movieItem, rate) => this.props.addNewMovie(movieItem, rate)}
                update={this.props.update}
              />
            ),
          },
          {
            label: 'Rated',
            key: '2',
            children: (
              <MovieList
                tabIndex={this.state.tabIndex}
                getData={getRatedMovies}
                ratedItems={this.props.ratedItems}
                isLoaded={this.props.isLoaded}
                addNewMovie={(movieItem, rate) => this.props.addNewMovie(movieItem, rate)}
                update={this.props.update}
              />
            ),
          },
        ]}
      />
    )
  }
}
