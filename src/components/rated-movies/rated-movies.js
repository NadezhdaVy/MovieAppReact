import React from 'react'
import { Layout } from 'antd'

import ViewContent from '../view-content'
import MovieService from '../../services/movie-service'
import MoviePagination from '../movie-pagination'
import './rated-movies.css'
import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner'

const { Content } = Layout

export default class RatedMovies extends React.Component {
  MovieService = new MovieService()

  state = {
    error: null,
    isLoaded: false,
    items: [],
    page: 1,
  }

  componentDidMount() {
    this.updateRatedList(this.state.page)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page || this.props.tabIndex !== prevProps.tabIndex) {
      this.updateRatedList(this.state.page)
    }
  }

  onChangePage = (page) => {
    this.setState({ page })
  }

  updateRatedList = (page) => {
    this.MovieService.getRatedMovies(page).then(
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

    const hasData = !(!isLoaded || error)
    const errorMsg = error ? <ErrorIndicator err={error} /> : null
    const loading = !isLoaded ? <Spinner /> : null
    const content = hasData ? (
      <ViewContent loading={loading} items={items} onChangeRate={(id, rate) => this.onRate(id, rate)} />
    ) : null
    // const pagination =
    //   items.length > 0 ? <MoviePagination onChangePage={(page) => onChangePage(page)} pageNumber={pageNumber} /> : null

    return (
      <Content className="movie-content">
        {errorMsg}
        {loading}
        {content}

        <MoviePagination onChangePage={(page) => this.onChangePage(page)} pageNumber={pageNumber} />
      </Content>
    )
  }
}
