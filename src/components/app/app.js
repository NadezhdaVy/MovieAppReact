import React from 'react'
import { Alert } from 'antd'
import { Offline, Online } from 'react-detect-offline'

import MovieService from '../../services/movie-service'
import { MovieServiceProvider } from '../movie-service-context'
import MovieTabs from '../movie-tabs'

import './app.css'

export default class App extends React.Component {
  movieService = new MovieService()

  render() {
    return (
      <MovieServiceProvider value={this.movieService}>
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
    )
  }
}
