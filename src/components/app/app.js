import React from 'react'

import MovieList from '../movie-list'
import MovieService from '../../services/movie-service'
import './app.css'

export default class App extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    items: [],
  }

  MovieService = new MovieService()

  componentDidMount() {
    this.MovieService.getResource('shr').then(
      (res) => {
        this.setState({
          isLoaded: true,
          items: res.slice(0, 6),
        })
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        })
      }
    )
  }

  render() {
    return (
      <div className="movie-app">
        <MovieList items={this.state.items} isLoaded={this.state.isLoaded} error={this.state.error} />
      </div>
    )
  }
}
