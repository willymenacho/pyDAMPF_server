import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  backgroundDark: {
    background:
      'linear-gradient(90deg, rgba(38,93,237,1) 0%, rgba(245,78,221,1) 100%)',
  },

  backgroundLight: {
    background:
      'linear-gradient(90deg, rgba(93,37,202,1) 0%, rgba(231,51,255,1) 100%)',
  },

  root: {
    backgroundColor: theme.palette.background.default,
  },
  title: {
    fontSize: '1.2rem',
    fontStyle: 'italic',
    fontWeight: 500,
  },
  score: {
    height: '100%',
    fontSize: '2.6rem',
    fontWeight: '700',
    fontFamily: 'Roboto Mono',
    margin: '0px',
    lineHeight: '2.4rem',
    letterSpacing: '0em',
  },
}))

export default function BoxScore({ title, score }) {
  const classes = useStyles()
  const theme = useTheme()
  const dark = theme.palette.type
  return (
    <React.Fragment>
      <Box
        height='90px'
        className={
          dark === 'dark' ? classes.backgroundDark : classes.backgroundLight
        }
        display='flex'
        justifyContent='center'
        alignItems='center'
        paddingLeft='4px'
        paddingRight='4px'
      >
        <Box
          width='100%'
          height='82px'
          display='flex'
          flexDirection='row'
          padding='5px'
          justifyContent='space-between'
          className={classes.root}
        >
          <Box display='flex' alignSelf='flex-start'>
            <Typography className={classes.title}>{title}</Typography>
          </Box>
          <Box display='flex' alignSelf='flex-end'>
            <Typography className={classes.score}>{score}</Typography>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}
