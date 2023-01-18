import React from 'react'
import { Layout } from 'antd'

import SearchMovie from '../search-movie'
import MovieList from '../movie-list'
import MovieService from '../../services/movie-service'
import './app.css'

const { Header } = Layout

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      title: '',
    }

    this.updateMovieList = this.updateMovieList.bind(this)
    this.onSearchMovie = this.onSearchMovie.bind(this)
    this.updateMovieList = this.updateMovieList.bind(this)
    this.MovieService = new MovieService()
  }

  componentDidMount() {
    this.updateMovieList(this.state.title)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.title !== this.state.title) {
      this.updateMovieList(this.state.title)
      console.log('dd')
    }
  }

  onSearchMovie(title) {
    this.setState({ title })
  }

  updateMovieList(title) {
    this.MovieService.getResource(title).then(
      (res) => {
        this.setState({
          isLoaded: true,
          items: res.slice(0, 6),
        })
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        })
      }
    )
  }

  render() {
    const { items, isLoaded, error } = this.state

    return (
      <div className="movie-app">
        <Layout className="content-layout">
          <Header className="header-input">
            <SearchMovie onSearchMovie={(value) => this.onSearchMovie(value)} />
          </Header>
          <MovieList items={items} isLoaded={isLoaded} error={error} />
        </Layout>
      </div>
    )
  }
}
