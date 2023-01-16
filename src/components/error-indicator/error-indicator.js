import React from 'react'
import { Alert } from 'antd'

import './error-indicator.css'

function ErrorIndicator() {
  return <Alert className="error" message="Someting went wrong" type="error" showIcon />
}

export default ErrorIndicator
