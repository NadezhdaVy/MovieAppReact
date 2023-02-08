import React from 'react'
import { Alert } from 'antd'
import { Offline, Online } from 'react-detect-offline'

import SessionMovieService from '../../services/session-movie-service'
import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner'
import MovieService from '../../services/movie-service'
import { MovieServiceProvider } from '../movie-service-context'
import MovieTabs from '../movie-tabs'

import './app.css'

export default class App extends React.Component {
  movieService = new MovieService()

  sessionMovieService = new SessionMovieService()

  state = {
    genres: [],

    isLoaded: false,
    error: null,
    guestSession: false,
  }

  componentDidMount() {
    this.movieService.getGenres().then(
      (res) => this.setState({ genres: res, isLoaded: true }),
      (error) => this.setState({ isLoaded: true, error })
    )
    this.sessionMovieService.setToken().then(() => this.setState({ guestSession: true }))
  }

  render() {
    const { isLoaded, guestSession, genres, error } = this.state
    const content =
      isLoaded && guestSession && !error ? (
        <MovieServiceProvider value={genres}>
          <div className="movie-app">
            <Online>
              <MovieTabs />
            </Online>
            <Offline>
              <Alert className="offline-msg" message="You are currently offline!" type="warning" showIcon />
              <MovieTabs />
            </Offline>
          </div>
        </MovieServiceProvider>
      ) : null
    const err = error ? <ErrorIndicator err={this.state.error} /> : null
    const loading = !isLoaded ? <Spinner /> : null
    return (
      <>
        {content}
        {loading}
        {err}
      </>
    )
  }
}
