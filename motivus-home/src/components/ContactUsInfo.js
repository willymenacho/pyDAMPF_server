import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Theme2 from './StyleTheme'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'left',
  },
}))

export default function ContatUsInfo() {
  const classes = useStyles()

  return (
    <Theme2>
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Typography variant='h4' color='primary'>
              Want to get in touch? We’d love to hear from you! Please complete
              this form to contact us.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid itme xs={12}>
              <Typography variant='body1'>Chile,</Typography>
            </Grid>
            <Grid itme xs={12}>
              <Typography variant='body1'>Perez Rosales 640,</Typography>
            </Grid>
            <Grid itme xs={12}>
              <Typography variant='body1'>Office 21,</Typography>
            </Grid>
            <Grid itme xs={12}>
              <Typography variant='body1'>Valdivia. </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Grid itme xs={12}>
              <Typography variant='h6' color='primary'>
                If you prefer, write us an email !
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h5' color='secondary'>
              <Grid itme xs={12}>
                <a href='mailto:info@motivus.cl?Subject=Contact%20form%20Motivus'>
                  info@motivus.cl
                </a>
              </Grid>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Theme2>
  )
}
