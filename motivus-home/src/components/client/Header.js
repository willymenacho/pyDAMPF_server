import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Nav from './Nav'
import Switch from '@material-ui/core/Switch'
import Sun from '@material-ui/icons/Brightness5'
import Moon from '@material-ui/icons/Brightness2Outlined'
import User from '../../contexts/User'
import Button from '@material-ui/core/Button'
import { navigate } from 'gatsby'

const useStyles = makeStyles((theme) => ({
  nav: {
    position: 'fixed',
    backgroundColor: theme.palette.background.headerBackground,
    width: 350,
    height: '100%',
  },

  divider: {
    background: theme.palette.secondary.main,
    width: '90%',
    height: 3,
  },

  textColor: {
    color: '#ffffff',
  },

  iconColor: {
    fill: '#ffffff',
  },
}))

function logout() {
  if (window.localStorage) {
    window.localStorage.removeItem('user_data')
    window.localStorage.removeItem('token')
  }
  navigate('/')
}

export default function Header({ darkState, setDarkState }) {
  const classes = useStyles()

  const handleChange = (event) => {
    setDarkState(event.target.checked)
  }

  const { user } = React.useContext(User)

  return (
    <div className={classes.nav}>
      <Box
        marginTop='25px'
        marginLeft='25px'
        width='325px'
        display='flex'
        flexDirection='column'
        //border='1px solid orange'
        height='95%'
        justifyContent='space-between'
      >
        <Box>
          <img
            alt='logoMotivus'
            src='/logoBeta.svg'
            width='300px'
            onClick={() => navigate('/')}
          ></img>
          <Box marginTop='-35px' marginBottom='25px'>
            <Typography
              variant='h4'
              color='textPrimary'
              className={classes.textColor}
            >
              {user.username || user.name}
            </Typography>
          </Box>
          <Divider className={classes.divider} />
          <Box marginTop={8}>
            <Nav />
          </Box>
        </Box>

        <Box
          display='flex'
          flexDirection='row'
          //border='1px solid red'
          justifyContent='space-between'
          mr='25px'
        >
          <Box display='flex' alignItems='center'>
            <Sun className={classes.iconColor} />
            <Switch
              checked={darkState}
              onChange={handleChange}
              color='primary'
              name='checkedA'
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <Moon color='primary' />
          </Box>
          <Button
            variant='outlined'
            color='secondary'
            size='large'
            className={classes.loginButton}
            onClick={logout}
          >
            logout
          </Button>
        </Box>
      </Box>
    </div>
  )
}
