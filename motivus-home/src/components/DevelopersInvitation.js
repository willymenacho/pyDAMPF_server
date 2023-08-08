import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
//import ReactPlayer from 'react-player/youtube'
import { Box } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { navigate } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles((theme) => ({
  secondary: {
    color: theme.palette.secondary.main,
  },
  nonItalic: {
    textDecoration: 'none',
    fontStyle: 'normal',
  },
  mono: {
    fontFamily: 'Roboto Mono',
    textTransform: 'uppercase',
    fontWeight: '300',
    fontStyle: 'normal',
  },
  startButton: {
    borderRadius: '0px',
    boxShadow: 'none',
  },
}))

export default function DevelopersInvitation() {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const matchesXs = useMediaQuery('(min-width:380px)')

  return (
    <React.Fragment>
      <Box
        display='flex'
        justifyContent={matches ? ' flex-start' : 'space-evenly'}
        alignItems={matches ? 'flex-end' : 'center'}
        mb={matches ? '130px' : '0px'}
        mt={matches ? '50px' : '0px'}
        flexDirection={matches ? 'row' : 'column'}
        padding={matches ? '0px' : '10px'}
        height={matches ? 'auto' : '100vh'}
        //border='1px solid green'
      >
        <Box
          display='flex'
          flexDirection={'column'}
          justifyContent={matches ? 'flex-end' : 'space-evenly'}
          mr={matches ? '50px' : '0px'}
          mb={matches ? '0px' : '50px'}
          height={matchesXs ? 'auto' : '75vh'}
          //border='1px solid red'
        >
          <Typography
            variant='h1'
            color='primary'
            gutterBottom
            className={classes.reducer}
          >
            <span className={classes.secondary}>
              <b>Build and scale your Algorithms</b>
            </span>{' '}
            simply and smartly
          </Typography>
          <Typography variant='h5' className={classes.nonItalic} gutterBottom>
            Create algorithms, use algorithms, market your results with infinite
            scaling and distribution power.
          </Typography>
          <Typography variant='h5' className={classes.mono} gutterBottom>
            Ready to create your aplication without limits?
          </Typography>
          <Box
            display='flex'
            width='280px'
            justifyContent='space-between'
            mt={matches ? '30px' : '20px'}
          >
            <Box className='Button'>
              <Button
                variant='contained'
                color='secondary'
                className={classes.startButton}
                onClick={() => navigate('/documentation')}
                size='large'
              >
                Start Now
              </Button>
            </Box>
            <Button variant='outlined' color='secondary' size='large'>
              contact us
            </Button>
          </Box>
        </Box>
        {matchesXs && (
          <Box
            display='flex'
            flexShrink={0}
            width={matches ? '350px' : '250px'}
          >
            <StaticImage
              src='../images/developerIntro.png'
              alt='Motivus for developers'
            />
          </Box>
        )}
      </Box>
    </React.Fragment>
  )
}
