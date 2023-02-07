import React from 'react'
import PropTypes from 'prop-types'

import ViewContent from '../view-content'
import SearchMovie from '../search-movie'
import MoviePagination from '../movie-pagination'
import './movie-list.css'
import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner'

export default class MovieList extends React.Component {
  static defaultProps = {
    getData: () => {},
  }

  static propTypes = {
    tabIndex: PropTypes.number.isRequired,
    getData: PropTypes.func,
  }

  state = {
    error: null,
    isLoaded: false,
    items: this.props.items,
    page: 1,
    title: '',
    totalPages: 0,
  }

  componentDidMount() {
    this.updateMovieList(this.state.page, this.state.title)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page || prevState.title !== this.state.title) {
      this.updateMovieList(this.state.page, this.state.title)
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
          items: res[0],
          totalPages: res[1],
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
    const { error, isLoaded, items, page: pageNumber, title, totalPages } = this.state

    const search =
      this.props.tabIndex === 1 ? (
        <SearchMovie
          title={title}
          tabIndex={this.props.tabIndex}
          onSearchMovie={(value) => this.onSearchMovie(value)}
        />
      ) : null

    const hasData = !(!isLoaded || error)
    const errorMsg = error ? <ErrorIndicator err={error} /> : null
    const loading = !isLoaded ? <Spinner /> : null
    const content = hasData ? (
      <ViewContent
        loading={isLoaded}
        items={items}
        onChangeRate={(id, rate) => this.onRate(id, rate)}
        ratedItems={this.props.ratedItems}
        tabIndex={this.props.tabIndex}
        addNewMovie={(movieItem, rate) => this.props.addNewMovie(movieItem, rate)}
      />
    ) : null

    return (
      <>
        {search}
        {errorMsg}
        {loading}
        {content}

        <MoviePagination
          ratedItems={this.props.ratedItems}
          totalPages={totalPages}
          onChangePage={(page) => this.onChangePage(page)}
          pageNumber={pageNumber}
          tabIndex={this.props.tabIndex}
        />
      </>
    )
  }
}
