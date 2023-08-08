import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import ReactPlayer from 'react-player/youtube'
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 500,
    color: theme.palette.secondary.main,
  },
  title: {
    fontSize: '2.5rem',
  },
}))

export default function Intro() {
  const classes = useStyles()
  return (
    <Box>
      <Container component='main' className={classes.heroContent}>
        <Typography
          variant='h1'
          align='center'
          color='primary'
          component='subtitle'
          display='block'
          gutterBottom
          className={classes.title}
        >
          Welcome to our Collaborative Data Processing Platform!
        </Typography>

        <Typography
          variant='body2'
          align='center'
          color='textPrimary'
          component='subtitle'
          display='block'
          gutterBottom
        >
          Motivus is a marketplace of resources where high-performance
          <span className={classes.bold}>
            {' '}
            distributed computing and algorithms
          </span>{' '}
          interact with each other to generate information and optimize
          processes in industry, science and technology.
        </Typography>
        <Box justifyContent='center' display='flex'>
          <ReactPlayer
            url='https://youtu.be/_H_2k-YoR1E'
            width='854px'
            height='480px'
            controls
            config={{
              youtube: {
                embedOptions: { controls: 1 },
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  )
}

/*Motivus is a collaborative
          <span className={classes.bold}>
            {' '}
            High Performance Computing Network.
          </span>{' '}
          With our framework you can process big volumes of data, and also earn
          extra income by renting your computer power to process data.*/
