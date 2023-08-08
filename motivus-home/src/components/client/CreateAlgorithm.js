import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import SettingTitle from './SettingsTitle'
import AccesTokenCard from './AccessTokenCard'
import Button from '@material-ui/core/Button'
import { classicNameResolver } from 'typescript'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { navigate } from 'gatsby-link'

const useStyles = makeStyles((theme) => ({
  createTokenDark: {
    color: theme.palette.calypso.main,
    borderColor: theme.palette.calypso.main,
  },

  createTokenLight: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
}))

export default function ApplicationTokens({}) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const dark = theme.palette.type
  return (
    <React.Fragment>
      <SettingTitle text='Algorithms ' />
      <Box
        mb='30px'
        display='flex'
        alignItems='flex-start'
        flexDirection={matches ? 'row' : 'column'}
        justifyContent='space-between'
      >
        <Typography variant='body1' gutterBottom>
          create, edit, and check the status of your algorithms
        </Typography>

        <Button
          variant='outlined'
          onClick={() => navigate('/account/my-algorithms/new')}
          className={
            dark === 'dark' ? classes.createTokenDark : classes.createTokenLight
          }
        >
          Create Algorithm
        </Button>
      </Box>
    </React.Fragment>
  )
}
