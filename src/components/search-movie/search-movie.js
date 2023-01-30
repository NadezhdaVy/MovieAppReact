import React from 'react'
import { Input } from 'antd'
import { debounce } from 'lodash'
import './search-movie.css'

class SearchMovie extends React.Component {
  state = {
    title: '',
  }

  debounced = debounce((val) => this.props.onSearchMovie(val), 700)

  handleChange(val) {
    val.preventDefault()
    const term = val.target.value

    this.setState({ title: term })
    this.debounced(term)
  }

  render() {
    return (
      <Input
        className="input-form"
        placeholder="Find movie"
        value={this.state.title}
        onChange={(e) => this.handleChange(e)}
      />
    )
  }
}

export default SearchMovie
