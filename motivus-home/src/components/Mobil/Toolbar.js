import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import { Box, Typography } from '@material-ui/core'
import Theme2 from '../StyleTheme'
import AppBar from '@material-ui/core/AppBar'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import Button from '@material-ui/core/Button'
import { navigate } from 'gatsby-link'
import Div100vh from 'react-div-100vh'

const styles = (Theme) => ({
  root: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '100%',
    //border: '2px solid green',
    zIndex: '2',
    top: '0%',
    pointerEvents: 'none',
  },
  appBar: {
    height: '55px',
    pointerEvents: 'all',
    //border: '2px solid red',
  },

  menuButton: {
    left: '0px',
  },
})

const useStyles = makeStyles((theme) => ({
  loginButton: {
    borderRadius: '0px',
    height: '30px',
    marginLeft: '20px',
  },
}))

function logout() {
  if (window.localStorage) {
    window.localStorage.removeItem('user_data')
    window.localStorage.removeItem('token')
  }
  navigate('/')
}

class ToolbarComponent extends React.Component {
  state = {
    achorEl: false,
    MobileMoreAnchorEl: false,
  }

  render() {
    const { classes } = this.props

    return (
      <Theme2>
        <Div100vh className={classes.root}>
          <AppBar className={classes.appBar} position='relative'>
            <Toolbar>
              <IconButton
                edge='start'
                className={classes.menuButton}
                color='secondary'
                aria-label='open drawer'
                onClick={this.props.openDrawerHandler}
              >
                <MenuIcon />
              </IconButton>
              <Typography>
                {this.props.account ? 'Motivus' : 'Motivus | Get In!'}
              </Typography>
              <AccountAccess account={this.props.account} />
            </Toolbar>
          </AppBar>
        </Div100vh>
      </Theme2>
    )
  }
}

export default withStyles(styles)(ToolbarComponent)

function AccountAccess({ account }) {
  const classes = useStyles()

  return (
    <React.Fragment>
      {!account ? (
        <Button
          variant='outlined'
          color='secondary'
          size='large'
          className={classes.loginButton}
          onClick={() => navigate('/account/login')}
        >
          login
        </Button>
      ) : (
        <Button
          variant='outlined'
          color='secondary'
          size='large'
          className={classes.loginButton}
          onClick={logout}
        >
          logout
        </Button>
      )}
    </React.Fragment>
  )
}
