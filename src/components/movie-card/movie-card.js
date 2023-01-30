import React from 'react'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { Card, Rate } from 'antd'

import MovieGenres from '../movie-genres'
import MovieProgress from '../movie-progress'
import MovieService from '../../services/movie-service'

import './movie-card.css'

const { Meta } = Card
export default class MovieCard extends React.Component {
  MovieService = new MovieService()

  state = {
    rateValue: this.props.item.rate,
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.rateValue !== prevState.rateValue) {
      this.updateRating(this.state.rateValue, this.props.item.movieId)
    }
  }

  onChangeRate = (e) => {
    this.setState({ rateValue: e })
  }

  updateRating = (rate, movieID) => {
    this.MovieService.rateMovie(rate, movieID).then((res) => console.log(res))
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
    } = this.props
    const release = releaseDate ? this.formatDate(releaseDate) : null
    const text = overview ? this.cutText(overview, 200) : null
    const img = cover || null
    return (
      <Card className="movie-item" hoverable={false} cover={<img className="movie-avatar" alt="example" src={img} />}>
        <Meta
          className="item-body"
          title={title}
          description={
            <div className="card-description">
              <MovieProgress progress={averageVote} />
              <div>
                <div className="date">{release}</div>
                <MovieGenres genres={genres} id={movieId} />

                <p className="movie-description">{text}</p>
              </div>
              <Rate
                className="movie-rate"
                count={10}
                allowHalf
                value={this.state.rateValue}
                onChange={(value) => this.onChangeRate(value)}
              />
            </div>
          }
        />
      </Card>
    )
  }
}
