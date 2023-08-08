import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: '100px',
    width: '100%',
  },
}))

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='http://motivus.cl/'>
        Motivus
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Footer() {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component='footer' className={classes.footer}>
        <Grid
          container
          spacing={1}
          container
          direction='row'
          alignItems='center'
        >
          <Grid item xs={4} container justify='flex-start' alignItems='center'>
            <img src={'/gobierno.png'} height='50'></img>
          </Grid>
          <Grid item xs={4}>
            <Container>
              <Copyright />
            </Container>
          </Grid>
          <Grid item xs={4} container justify='flex-end' alignItems='center'>
            <img src={'/corfo.gif'} height='50'></img>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
