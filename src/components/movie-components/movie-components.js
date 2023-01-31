/* eslint-disable prettier/prettier */
import React from 'react'

import MovieList from '../movie-list'
// import MovieService from '../../services/movie-service'
import { MovieServiceConsumer } from '../movie-service-context'

// const movieService = new MovieService()
// const { getResource, getRatedMovies, rateMovie } = movieService

function AllMovies({ tabIndex }) {
  return (
    <MovieServiceConsumer>
      {({ getResource }) => <MovieList tabIndex={tabIndex} getData={getResource} />}
    </MovieServiceConsumer>
  )
}

function RatedMovies({ tabIndex }) {
  return (
    <MovieServiceConsumer>
      {({ getRatedMovies }) => <MovieList tabIndex={tabIndex} getData={getRatedMovies} />}
    </MovieServiceConsumer>
  )
}
export { AllMovies, RatedMovies }
