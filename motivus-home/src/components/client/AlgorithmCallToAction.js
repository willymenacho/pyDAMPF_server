import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import useMediaQuery from '@material-ui/core/useMediaQuery'

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
  code: {
    fontFamily: 'Roboto Mono',
    fontSize: '1.25rem',
  },
  icon: {
    fill: theme.palette.secondary.main,
    fontSize: '2rem',
  },
  title: {
    fontSize: '1.7rem',
    color: theme.palette.calypso.main,
  },
}))

export default function AlgorithmCallToAction({ console}) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const dark = theme.palette.type
  return (
    <React.Fragment>
      <Typography variant='h3' className={classes.title} gutterBottom>
      Add this line in your driver and <b><i>Get started!</i></b>
      </Typography>
      
      <Box
        className={
          dark === 'dark' ? classes.backgroundDark : classes.backgroundLight
        }
        display='flex'
        justifyContent='center'
        alignItems='center'
        paddingTop='4px'
        paddingBottom='4px'
        paddingLeft='4px'
        paddingRight='4px'
      >
        <Box
          width='100%'
          paddingTop='10px'
          paddingBottom='10px'
          display='flex'
          flexDirection='row'
          padding='5px'
          justifyContent='space-between'
          px='15px'
          alignItems='center'
          className={classes.root}
        >
          <Typography variant='h3' className={classes.code}>
            {console}
          </Typography>
          {matches && <FileCopyOutlinedIcon
            className={classes.icon}
            onClick={() => navigator.clipboard.writeText(console)}
          />}
        </Box>
      </Box>
    </React.Fragment>
  )
}
