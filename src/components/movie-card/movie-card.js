import React from 'react'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { Card } from 'antd'
import PropTypes from 'prop-types'

import useWindowDimensions from '../window-dimensions/window-dimensions'
import MovieService from '../../services/movie-service'
import RateMovie from '../rate-movie'
import MovieGenres from '../movie-genres'
import MovieProgress from '../movie-progress'
import './movie-card.css'
import { MovieServiceConsumer } from '../movie-service-context'

import icon from './no-cover.png'

const { Meta } = Card

function MovieCard({
  item: { releaseDate, overview, cover, movieId, genres, title, averageVote },
  ratedItems,
  item,
  tabIndex,
  addNewMovie,
}) {
  const movieService = new MovieService()
  const { width } = useWindowDimensions()

  const formatDate = (date) => format(parseISO(date), 'MMM dd, YYY').toString()

  const cutText = (text) => {
    let maxLength = 60
    if (width > 1210) {
      maxLength = 170
    } else if (width > 1130 && width < 1210) {
      maxLength = 120
    } else if (width > 768 && width < 1130) {
      maxLength = 80
    } else if (width > 600 && width < 760) {
      maxLength = 150
    }
    text = text.trim()
    if (text.length <= maxLength) return text

    text = text.slice(0, maxLength)
    text = text.substr(0, Math.min(text.length, text.lastIndexOf(' ')))

    return `${text.trim()}...`
  }
  console.log(icon)
  let movie
  if (item && tabIndex === 1) {
    const getItem = ratedItems.find((el) => el.movieId === movieId)
    if (getItem) {
      movie = { ...getItem }
    } else {
      movie = item
    }
  } else {
    movie = item
  }

  const release = releaseDate ? formatDate(releaseDate) : null
  const text = overview ? cutText(overview) : null
  const img = cover ? `https://image.tmdb.org/t/p/w500/${cover}` : icon

  if (!movieId) {
    return []
  }
  const { rateMovie } = movieService

  return (
    <Card
      className="movie-item"
      hoverable
      bodyStyle={{
        maxWidth: '200px',
      }}
      style={{
        display: 'grid',
        gridTemplateColumns: '30% 70%',

        height: '300px',
        borderRadius: '0',
      }}
      cover={<img style={{ borderRadius: '0px' }} className="movie-avatar" alt="poster" src={img} />}
    >
      <MovieProgress progress={averageVote} />
      <Meta
        style={{ height: '100%' }}
        className="item-body"
        title={title}
        description={
          <div className="card-description">
            <div>
              <div className="date">{release}</div>
              <MovieServiceConsumer>
                {(value) => <MovieGenres genres={genres} id={movieId} allGenres={value} />}
              </MovieServiceConsumer>

              <p className="movie-description">{text}</p>
            </div>

            <RateMovie
              item={movie}
              movieId={movie.movieId}
              rate={movie.rate}
              rateMovie={rateMovie}
              id={movie.movieId}
              addNewMovie={(movieItem, rate) => addNewMovie(movieItem, rate)}
            />
          </div>
        }
      />
    </Card>
  )
}
MovieCard.propTypes = {
  item: PropTypes.object.isRequired,
}
export default MovieCard
