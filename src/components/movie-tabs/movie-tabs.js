import React from 'react'
import { Tabs } from 'antd'

import MovieList from '../movie-list'
import MovieService from '../../services/movie-service'
import './movie-tabs.css'

export default class MovieTabs extends React.Component {
  movieService = new MovieService()

  state = {
    tabIndex: 1,
    ratedItems: [],
    isLoaded: false,
    error: null,
  }

  componentDidMount() {
    this.movieService.getRatedIds().then(
      (res) => {
        this.setState({ ratedItems: res, isLoaded: true })
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        })
      }
    )
  }

  onChange = (key) => {
    this.setState({ tabIndex: Number(key) })
  }

  addNewMovie = (item, rate) => {
    this.setState(({ ratedItems }) => ({ ratedItems: this.toggle(ratedItems, item, rate) }))
  }

  toggle = (arr, movieItem, vote) => {
    let newArr

    const index = arr.findIndex((el) => el.movieId === movieItem.movieId)

    if (index !== -1) {
      const oldItem = arr[index]
      const newItem = { ...oldItem, rate: vote }

      newArr = [...arr.slice(0, index), newItem, ...arr.slice(index + 1)]
    }
    if (index === -1) {
      const newItem = { ...movieItem, rate: vote }
      newArr = [...arr, newItem]
    }
    return newArr
  }

  render() {
    const { getResource, getRatedMovies } = this.movieService
    if (!this.state.isLoaded || this.state.error) {
      return []
    }
    return (
      <Tabs
        destroyInactiveTabPane
        tabBarGutter={30}
        size="large"
        centered
        //  tabBarStyle={{ width: '150px', margin: '0 auto', marginBottom: '1em' }}
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
                ratedItems={this.state.ratedItems}
                isLoaded={this.state.isLoaded}
                addNewMovie={(movieItem, rate) => this.addNewMovie(movieItem, rate)}
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
                ratedItems={this.state.ratedItems}
                isLoaded={this.state.isLoaded}
                addNewMovie={(movieItem, rate) => this.addNewMovie(movieItem, rate)}
              />
            ),
          },
        ]}
      />
    )
  }
}
