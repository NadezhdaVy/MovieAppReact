import React from 'react'

import ViewContent from '../view-content'
import SearchMovie from '../search-movie'
// import MovieService from '../../services/movie-service'
import MoviePagination from '../movie-pagination'
import './movie-list.css'
import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner'

export default class MovieList extends React.Component {
  //  MovieService = new MovieService()

  state = {
    error: null,
    isLoaded: false,
    items: [],
    page: 1,
    title: '',
  }

  componentDidMount() {
    this.updateMovieList(this.state.page, this.state.title)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.title !== this.state.title ||
      this.props.tabIndex !== prevProps.tabIndex
    ) {
      this.updateMovieList(this.state.page, this.state.title)
      console.log(this.props.tabIndex)
    }
  }

  onSearchMovie = (title) => {
    this.setState({ title, page: 1 })
  }

  onChangePage = (page) => {
    this.setState({ page })
  }

  updateMovieList = (page, title) => {
    const { getData } = this.props
    getData(page, title).then(
      (res) => {
        this.setState({
          isLoaded: true,
          items: res,
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

    const search =
      this.props.tabIndex === 1 ? (
        <SearchMovie tabIndex={this.props.tabIndex} onSearchMovie={(value) => this.onSearchMovie(value)} />
      ) : null
    const hasData = !(!isLoaded || error)
    const errorMsg = error ? <ErrorIndicator err={error} /> : null
    const loading = !isLoaded ? <Spinner /> : null
    const content = hasData ? (
      <ViewContent loading={isLoaded} items={items} onChangeRate={(id, rate) => this.onRate(id, rate)} />
    ) : null

    return (
      <>
        {search}
        {errorMsg}
        {loading}
        {content}

        <MoviePagination onChangePage={(page) => this.onChangePage(page)} pageNumber={pageNumber} />
      </>
    )
  }
}
