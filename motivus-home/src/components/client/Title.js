import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles({
  divider: {
    //background: 'linear-gradient(90deg, #FE6B8B 30%, #FFFFFF 90%)',
    background:
      'linear-gradient(90deg, rgba(207,100,235,1) 0%, rgba(207,100,235,1) 50%, rgba(207,100,235,0) 100%)',
  },
})

const Title = ({ text }) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <React.Fragment>
      <Box>
        <Box display='flex' alignItems='center'>
          <Box paddingRight={2}>
            <Typography
              color='textPrimary'
              variant='h1'
              style={{
                whiteSpace: 'nowrap',
                fontSize: matches ? '3.1rem' : '2.1rem',
              }}
            >
              {text}
            </Typography>
          </Box>
          <Box
            className={classes.divider}
            maxWidth='100%'
            height='4px'
            width='100%'
          ></Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Title
