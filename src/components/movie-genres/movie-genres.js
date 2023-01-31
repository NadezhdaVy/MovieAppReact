import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'

import './movie-genres.css'

export default class MovieGenres extends React.Component {
  static defaultProps = {
    getGenres: () => {},
  }

  static propTypes = {
    genres: PropTypes.arrayOf(PropTypes.number).isRequired,
    getGenres: PropTypes.func,
  }

  id = 2000

  state = {
    genres: [],
    loading: true,
    error: null,
    currGenres: this.props.genres,
  }

  componentDidMount() {
    this.getMovieGenres()
  }

  getMovieGenres = () => {
    const { getGenres } = this.props
    getGenres().then(
      (res) => {
        this.setState({
          genres: res,
          loading: false,
        })
      },
      (error) => {
        this.setState({
          loading: false,
          error,
        })
      }
    )
  }

  render() {
    const { loading, error, genres, currGenres } = this.state
    if (!loading && !error) {
      const allGenres = genres
      const currentGenres = currGenres
      const names = allGenres.filter((item) => currentGenres.includes(item.id))
      return (
        <div className="movie-genres">
          {names.map((it) => (
            <Tag className="genre" key={this.id++}>
              {it.name}
            </Tag>
          ))}
        </div>
      )
    }
    return <div />
  }
}
