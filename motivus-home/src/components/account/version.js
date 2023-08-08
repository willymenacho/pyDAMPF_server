import { Box, Typography } from '@material-ui/core'
import React from 'react'

function Version() {
  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      <Typography align='center'>v{process.env.GATSBY_APP_VERSION}</Typography>
    </Box>
  )
}

export default Version
