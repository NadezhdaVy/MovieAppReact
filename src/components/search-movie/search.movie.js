import React from 'react'
import { Input } from 'antd'
import { debounce } from 'lodash'
import './search-movie.css'

class SearchMovie extends React.Component {
  constructor(props) {
    super(props)
    this.state = { title: '' }

    this.handleChange = this.handleChange.bind(this)
    this.debounced = debounce(() => this.props.onSearchMovie(this.state.title), 1000)
  }

  handleChange(e) {
    const title = e.target.value
    this.setState({ title })

    this.debounced()
  }

  render() {
    return (
      <Input className="input-form" placeholder="Find movie" value={this.state.title} onChange={this.handleChange} />
    )
  }
}

export default SearchMovie
