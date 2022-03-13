import { CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
      <div className='loading-container'>
          <CircularProgress className='loading' />
      </div>
  )
}

export default Loading