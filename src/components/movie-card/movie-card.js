import React from 'react'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { Card } from 'antd'
import PropTypes from 'prop-types'

import { MovieServiceConsumer } from '../movie-service-context'
import RateMovie from '../rate-movie'
import MovieGenres from '../movie-genres'
import MovieProgress from '../movie-progress'

import './movie-card.css'

const { Meta } = Card
export default class MovieCard extends React.Component {
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
      item: { releaseDate, overview, cover, movieId, genres, title, averageVote, rate },
    } = this.props

    const release = releaseDate ? this.formatDate(releaseDate) : null
    const text = overview ? this.cutText(overview, 150) : null
    const img = cover || null
    const mTitle = this.cutText(title, 20)

    return (
      <MovieServiceConsumer>
        {({ rateMovie, getGenres }) => (
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

                  <RateMovie movieId={movieId} rate={rate} rateMovie={rateMovie} />
                </div>
              }
            />
          </Card>
        )}
      </MovieServiceConsumer>
    )
  }
}