import React from 'react'
import { Tag } from 'antd'

import MovieService from '../../services/movie-service'

export default class MovieGenres extends React.Component {
  id = 2000

  MovieService = new MovieService()

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
    this.MovieService.getGenres().then(
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
