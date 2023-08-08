import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'

const useStyles = makeStyles((theme) => ({
  starNumber: {
    fontFamily: 'Roboto Mono',
    fontWeight: '600',
    color: 'white',
    fontSize: '1.2rem',
  },
  starBadegeRoot: {
    backgroundColor: theme.palette.primary.main,
  },
  starIcon: {
    fill: theme.palette.calypso.main,
  },
  starBackground: {
    backgroundColor: theme.palette.background.headerBackground,
  },
}))

export default function StarBadge({ stars }) {
  const classes = useStyles()
  const theme = useTheme()
  const dark = theme.palette.type
  return (
    <React.Fragment>
      <Box
        display='flex'
        alignItems='center'
        className={classes.starBadegeRoot}
        width='120px'
      >
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          mr='15px'
          height='100%'
          className={classes.starBackground}
        >
          <StarIcon className={classes.starIcon} fontSize='large' />
        </Box>
        <Typography variant='body1' className={classes.starNumber}>
          {stars}
        </Typography>
      </Box>
    </React.Fragment>
  )
}
