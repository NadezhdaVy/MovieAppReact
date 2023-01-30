import React from 'react'

import ViewContent from '../view-content'
import SearchMovie from '../search-movie'
import MovieService from '../../services/movie-service'
import MoviePagination from '../movie-pagination'
import './movie-list.css'
import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner'

export default class MovieList extends React.Component {
  MovieService = new MovieService()

  state = {
    error: null,
    isLoaded: false,
    items: [],
    page: 1,
    title: '',
  }

  componentDidMount() {
    this.updateMovieList(this.state.title, this.state.page)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page || prevState.title !== this.state.title) {
      this.updateMovieList(this.state.title, this.state.page)
    }
  }

  onSearchMovie = (title) => {
    this.setState({ title, page: 1 })
  }

  onChangePage = (page) => {
    this.setState({ page })
  }

  updateMovieList = (title, page) => {
    this.MovieService.getResource(title, page).then(
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
    const { error, isLoaded, items, page: pageNumber } = this.state

    const hasData = !(!isLoaded || error)
    const errorMsg = error ? <ErrorIndicator err={error} /> : null
    const loading = !isLoaded ? <Spinner /> : null
    const content = hasData ? (
      <ViewContent loading={loading} items={items} onChangeRate={(id, rate) => this.onRate(id, rate)} />
    ) : null
    // const pagination =
    //   items.length > 0 ? (
    //     <MoviePagination onChangePage={(page) => this.onChangePage(page)} pageNumber={pageNumber} />
    //   ) : null

    return (
      <>
        <SearchMovie onSearchMovie={(value) => this.onSearchMovie(value)} />

        {errorMsg}
        {loading}
        {content}

        <MoviePagination onChangePage={(page) => this.onChangePage(page)} pageNumber={pageNumber} />
      </>
    )
  }
}
