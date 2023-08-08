import { Typography } from '@material-ui/core'
import React from 'react'

export default function Intro() {
  return (
    <React.Fragment>
      <Typography variant='h3' color='secondary' align='center' gutterBottom>
        Software factory
      </Typography>
      <Typography
        variant='body1'
        align='center'
        color='textSecondary'
        gutterBottom
      >
        If you have data that you need to analyse or process, but don’t have the
        technical expertise to program your own application, then you can use
        our Software Factory services.
      </Typography>
    </React.Fragment>
  )
}
