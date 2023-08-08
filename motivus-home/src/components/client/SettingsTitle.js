import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box, Divider, Typography } from '@material-ui/core'
import { classicNameResolver } from 'typescript'

const useStyles = makeStyles((theme) => ({
  divider: {
    backgroundColor: theme.palette.text.primary,
  },
}))

export default function SettingTitle({ text }) {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <React.Fragment>
      <Box mt='32.5px'>
        <Typography color='textPrimary' variant='h4'>
          {text}
        </Typography>
        <Box my='10px' height='1px' width='100%' className={classes.divider} />
      </Box>
    </React.Fragment>
  )
}
