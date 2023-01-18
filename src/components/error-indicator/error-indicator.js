import React from 'react'
import { Alert } from 'antd'

import './error-indicator.css'

function ErrorIndicator({ err }) {
  return <Alert className="error" message={err.message} type="error" showIcon />
}

export default ErrorIndicator
