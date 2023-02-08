import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'

import './movie-genres.css'

export default class MovieGenres extends React.Component {
  static propTypes = {
    genres: PropTypes.arrayOf(PropTypes.number).isRequired,
  }

  id = 2000

  render() {
    const { genres, allGenres } = this.props

    const all = allGenres
    const currentGenres = genres

    const names = all.filter((item) => currentGenres.includes(item.id))
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
}
