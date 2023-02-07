import React from 'react'
import PropTypes from 'prop-types'
import { Rate } from 'antd'

import './rate-movie.css'

export default class RateMovie extends React.Component {
  static defaultProps = {
    rateMovie: () => {},
  }

  static propTypes = {
    rateMovie: PropTypes.func,
  }

  state = {
    rateValue: this.props.rate,
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.rateValue !== prevState.rateValue) {
      this.updateRating(this.state.rateValue, this.props.movieId)
      this.props.addNewMovie(this.props.item, this.state.rateValue)
    }
  }

  onChangeRate = (e) => {
    this.setState({ rateValue: e })
  }

  updateRating = (rate, movieID) => {
    const { rateMovie } = this.props
    rateMovie(rate, movieID)
  }

  render() {
    return (
      <Rate
        className="movie-rate"
        count={10}
        allowHalf
        value={this.state.rateValue}
        onChange={(value) => this.onChangeRate(value)}
      />
    )
  }
}
