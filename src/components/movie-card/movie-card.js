import React from 'react'
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

  render() {
    const { item } = this.props
    return (
      <Card
        tabBarExtraContent="popopo"
        className="movie-item"
        hoverable={false}
        cover={<img className="movie-avatar" alt="example" src={item.cover} />}
      >
        <Meta
          className="item-body"
          title={item.title}
          description={
            <div className="card-description">
              <MovieProgress progress={item.averageVote} />
              <div>
                <div className="date">{item.releaseDate}</div>
                <MovieGenres genres={item.genres} id={item.movieId} />

                <p className="movie-description">{item.overview}</p>
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
