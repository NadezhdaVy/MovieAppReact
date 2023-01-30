import React from 'react'

import MovieList from '../movie-list'
import MovieService from '../../services/movie-service'
// import { MovieServiceConsumer } from '../movie-service-context'

const movieService = new MovieService()
const { getResource, getRatedMovies } = movieService

function AllMovies({ tabIndex }) {
  return <MovieList tabIndex={tabIndex} getData={getResource} />
}

function RatedMovies({ tabIndex }) {
  return <MovieList tabIndex={tabIndex} getData={getRatedMovies} />
}
export { AllMovies, RatedMovies }
