import React from 'react'
import { Alert } from 'antd'
import { Offline, Online } from 'react-detect-offline'

import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner'
import MovieService from '../../services/movie-service'
import { MovieServiceProvider } from '../movie-service-context'
import MovieTabs from '../movie-tabs'

import './app.css'

export default class App extends React.Component {
  movieService = new MovieService()

  state = {
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
    const content = this.state.isLoaded ? (
      <MovieServiceProvider value={this.movieService}>
        <div className="movie-app">
          <Online>
            <MovieTabs
              isLoaded={this.state.isLoaded}
              ratedItems={this.state.ratedItems}
              addNewMovie={(movieItem, rate) => this.addNewMovie(movieItem, rate)}
            />
          </Online>
          <Offline>
            <Alert className="offline-msg" message="You are currently offline!" type="warning" showIcon />
            <MovieTabs />
          </Offline>
        </div>
      </MovieServiceProvider>
    ) : null
    const err = this.state.error ? <ErrorIndicator err={this.state.error} /> : null
    const loading = !this.state.isLoaded ? <Spinner /> : null
    return (
      <>
        {content}
        {loading}
        {err}
      </>
    )
  }
}
