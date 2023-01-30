import React from 'react'
import { Progress, Space } from 'antd'
import './movie-progress.css'

function MovieProgress({ progress }) {
  let progressColor
  if (progress <= 3) {
    progressColor = '#E90000'
  } else if (progress > 3 && progress <= 5) {
    progressColor = '#E97E00'
  } else if (progress > 5 && progress <= 7) {
    progressColor = '#E9D100'
  } else {
    progressColor = '#66E900'
  }

  return (
    <Space wrap className="movie-progress">
      <Progress
        type="circle"
        percent={100}
        format={(percent) => `${((percent * progress) / 100).toFixed(1)}`}
        strokeColor={progressColor}
        width={40}
        status="normal"
      />
    </Space>
  )
}

export default MovieProgress
