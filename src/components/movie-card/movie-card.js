import React from 'react'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { Card } from 'antd'
import PropTypes from 'prop-types'

import MovieService from '../../services/movie-service'
import RateMovie from '../rate-movie'
import MovieGenres from '../movie-genres'
import MovieProgress from '../movie-progress'

import './movie-card.css'

const { Meta } = Card

export default class MovieCard extends React.Component {
  movieService = new MovieService()

  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  formatDate = (date) => format(parseISO(date), 'MMM dd, YYY').toString()

  cutText = (text, maxLength) => {
    text = text.trim()
    if (text.length <= maxLength) return text

    text = text.slice(0, maxLength)
    text = text.substr(0, Math.min(text.length, text.lastIndexOf(' ')))
    return `${text.trim()}...`
  }

  render() {
    const {
      item: { releaseDate, overview, cover, movieId, genres, title, averageVote },
      ratedItems,
    } = this.props
    let movie
    if (this.props.item && this.props.tabIndex === 1) {
      const getItem = ratedItems.find((el) => el.movieId === movieId)
      if (getItem) {
        movie = { ...getItem }
      } else {
        movie = this.props.item
      }
    } else {
      movie = this.props.item
    }

    const release = releaseDate ? this.formatDate(releaseDate) : null
    const text = overview ? this.cutText(overview, 150) : null
    const img = cover || null
    const mTitle = this.cutText(title, 20)
    if (!movieId) {
      return []
    }

    const { rateMovie, getGenres } = this.movieService
    return (
      <Card
        className="movie-item"
        hoverable={false}
        cover={<img style={{ borderRadius: '0px' }} className="movie-avatar" alt="example" src={img} />}
      >
        <MovieProgress progress={averageVote} />
        <Meta
          className="item-body"
          title={mTitle}
          description={
            <div className="card-description">
              <div>
                <div className="date">{release}</div>
                <MovieGenres genres={genres} id={movieId} getGenres={getGenres} />

                <p className="movie-description">{text}</p>
              </div>

              <RateMovie
                item={movie}
                movieId={movie.movieId}
                rate={movie.rate}
                rateMovie={rateMovie}
                id={movie.movieId}
                addNewMovie={(movieItem, rate) => this.props.addNewMovie(movieItem, rate)}
              />
            </div>
          }
        />
      </Card>
    )
  }
}
