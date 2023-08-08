import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { mdiGithub } from '@mdi/js'
import Icon from '@mdi/react'
import { mdiGoogle } from '@mdi/js'
import { navigate } from 'gatsby-link'
import Div100vh from 'react-div-100vh'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { API_BASE_URL } from '../../models'

const useStyles = makeStyles((theme) => ({
  background: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //border: '1px solid red',
    background: '#131144',
  },
  paper: {
    background:
      'linear-gradient(45deg, #2C2771 0%, #5D25CA 85%  ,#8641D8 100%)',
    border: '1px solid',
    borderColor: theme.palette.secondary.main,
    //boxShadow: 'none',
  },
  text: {
    fontSize: '1.5rem',
  },
  robotoMono: {
    fontFamily: 'Roboto Mono',
    fontWeight: '500',
    color: theme.palette.secondary.light,
  },
}))

export default function Login({ open, setOpen }) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <Div100vh>
      <div className={classes.background}>
        <Box
          className={classes.paper}
          width={matches ? '50%' : '90%'}
          height={matches ? '50%' : '55%'}
          padding={matches ? '15px' : '0px'}
        >
          <Box
            display='flex'
            height='100%'
            flexDirection='column'
            alignItems='flex-start'
            justifyContent='space-between'
            //border='1px solid red'
            padding='30px'
          >
            <Box width={matches ? '50%' : '100%'}>
              <Typography variant='h1' color='textPrimary'>
                <b>
                  <i>Hello!</i>
                </b>
              </Typography>
              <Typography
                variant='body2'
                color='textPrimary'
                className={classes.text}
              >
                Welcome to the Motivus comunity. Please{' '}
                <span className={classes.robotoMono}>lOGIN</span> to start
                session.
              </Typography>
            </Box>
            <Box display='flex' width='100%' justifyContent='flex-end'>
              <IconButton
                onClick={() => navigate(`${API_BASE_URL}/auth/github`)}
                color='secondary'
                aria-label='github logIn'
                size='large'
              >
                <Icon path={mdiGithub} size={matches ? 4 : 3} />
              </IconButton>
              <IconButton
                onClick={() => navigate(`${API_BASE_URL}/auth/google`)}
                color='secondary'
                aria-label='google logIn'
                size='large'
              >
                <Icon path={mdiGoogle} size={matches ? 4 : 3} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </div>
    </Div100vh>
  )
}
