import React from 'react'
import { Tabs } from 'antd'

import MovieList from '../movie-list'
import MovieService from '../../services/movie-service'
import './movie-tabs.css'

export default class MovieTabs extends React.Component {
  movieService = new MovieService()

  state = {
    tabIndex: 1,
  }

  onChange = (key) => {
    this.setState({ tabIndex: Number(key) })
  }

  render() {
    const { getResource, getRatedMovies } = this.movieService

    // const searchList =
    //   this.state.tabIndex === 1 ? (
    //     <MovieList
    //       tabIndex={this.state.tabIndex}
    //       getData={getResource}
    //       ratedItems={this.props.ratedItems}
    //       isLoaded={this.props.isLoaded}
    //       addNewMovie={(movieItem, rate) => this.props.addNewMovie(movieItem, rate)}
    //       update={this.props.update}
    //     />
    //   ) : null
    // const ratedList =
    //   this.state.tabIndex === 2 ? (
    //     <MovieList
    //       tabIndex={this.state.tabIndex}
    //       getData={getRatedMovies}
    //       ratedItems={this.props.ratedItems}
    //       isLoaded={this.props.isLoaded}
    //       addNewMovie={(movieItem, rate) => this.props.addNewMovie(movieItem, rate)}
    //       update={this.props.update}
    //     />
    //   ) : null

    return (
      // <Tabs
      //  defaultActiveKey="1"
      //  //  destroyInactiveTabPane
      //  centered
      //  onChange={this.onChange}
      //  items={new Array(2).fill(null).map((_, i) => {
      //    const id = String(i + 1)
      //    return {
      //      label: `Tab: ${id}`,
      //      key: id,
      //      children: (
      //        <>
      //          {searchList} {ratedList}
      //        </>
      //      ),
      //    }
      //  })}
      /// >

      <Tabs
        destroyInactiveTabPane
        tabBarGutter={30}
        size="large"
        tabBarStyle={{ width: '150px', margin: '0 auto', marginBottom: '1em' }}
        className="movie-tabs"
        defaultActiveKey="1"
        disabled
        onChange={this.onChange}
        items={[
          {
            label: 'Search',
            key: '1',
            children: (
              <MovieList
                tabIndex={this.state.tabIndex}
                getData={getResource}
                ratedItems={this.props.ratedItems}
                isLoaded={this.props.isLoaded}
                addNewMovie={(movieItem, rate) => this.props.addNewMovie(movieItem, rate)}
                update={this.props.update}
              />
            ),
          },
          {
            label: 'Rated',
            key: '2',
            children: (
              <MovieList
                tabIndex={this.state.tabIndex}
                getData={getRatedMovies}
                ratedItems={this.props.ratedItems}
                isLoaded={this.props.isLoaded}
                addNewMovie={(movieItem, rate) => this.props.addNewMovie(movieItem, rate)}
                update={this.props.update}
              />
            ),
          },
        ]}
      />
    )
  }
}
