import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import HomeIcon from '@material-ui/icons/Home'
import GitHubIcon from '@material-ui/icons/GitHub'
import WhiteArrow from '../../../static/whiteArrow.png'
import BlackArrow from '../../../static/blackArrow.png'

const useStyles = makeStyles((theme) => ({
  linkStyle: {
    fontFamily: 'Asap',
    fontWeight: '500',
    fontSize: '1.2rem',
    marginLeft: '0.25rem',
    marginRight: '0.25rem',
  },
  a: {
    color: theme.palette.text.primary,
  },
}))

export default function AlgorithmLinks({ web, github, matches=false }) {
  const classes = useStyles()
  const theme = useTheme()
  const dark = theme.palette.type
  return (
    <Box display='flex' flexDirection='column' alignItems={matches ? 'flex-end' : 'flex-start'}  >
      <a href={web} className={classes.a} target='_blank'>
        <Box display='flex' flexDirection='row'  alignItems='center' >
          <HomeIcon color='secondary' />
          <Typography variant='h5' className={classes.linkStyle}>
            Homepage
          </Typography>
          {dark === 'dark' ? (
            <img src={WhiteArrow} height='12px' alt='->' />
          ) : (
            <img src={BlackArrow} height='12px' alt='->' />
          )}
        </Box>
      </a>
      <a href={github} className={classes.a} target='_blank'>
        <Box display='flex' flexDirection='row'  alignItems='center' mt='10px' >
          <GitHubIcon color='secondary' />
          <Typography variant='h5' className={classes.linkStyle}>
            Github
          </Typography>
          {dark === 'dark' ? (
            <img src={WhiteArrow} height='12px' alt='->' />
          ) : (
            <img src={BlackArrow} height='12px' alt='->' />
          )}
        </Box>
      </a>
    </Box>
  )
}
