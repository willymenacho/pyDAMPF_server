import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6, 4, 6),
  },
}))

export default function Works() {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Container className={classes.root}>
        <Typography
          variant='h3'
          align='center'
          display='block'
          color='secondary'
          gutterBottom
        >
          How it works
        </Typography>
        <Typography variant='body1' align='center' display='block'>
          Instead of using a supercomputer or an expensive cloud service,
          Motivus empowers regular computer users to share their computing
          resources to create a powerful and collaborative high computing
          network. Our network is able to tackle the most demanding data science
          problems.{' '}
        </Typography>
      </Container>
      <img src={'/Diagrama2.png'} width='100%'></img>
    </React.Fragment>
  )
}
