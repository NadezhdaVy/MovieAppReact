import React from 'react'
import { Alert } from 'antd'
import { Offline, Online } from 'react-detect-offline'

import MovieTabs from '../movie-tabs'

import './app.css'

export default class App extends React.Component {
  render() {
    return (
      <div className="movie-app">
        <Online>
          <MovieTabs />
        </Online>
        <Offline>
          <Alert className="offline-msg" message="You are currently offline!" type="warning" showIcon />
          <MovieTabs />
        </Offline>
      </div>
    )
  }
}
