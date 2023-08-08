import React from 'react'
import { Link } from 'gatsby'
import { Box, Dialog, Slide } from '@material-ui/core'
import {
  nav,
  background,
  navList,
  navItem,
  activeNavItem,
} from '../../styles/mobileNav.module.css'
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles'
import Div100vh from 'react-div-100vh'

const useStyles = makeStyles((theme) => ({
  webContent: {
    //border: '1px solid red',
    marginLeft: 400,
    paddingTop: 25,
    marginRight: 50,
  },

  mobileContent: {
    //border: '1px solid red',
    margin: 10,
  },

  background: {
    background: 'rgb(93, 37, 202)',
    background:
      'radial-gradient( circle, rgba(93, 37, 202, 1) 0%, rgba(48, 20, 102, 1) 100% )',
  },

  nav: {
    display: 'flex',
    fontSize: '1.6em',
    fontFamily: 'Asap, sans-serif',
    fontWeight: 400,
    //border: '2px solid green',
  },

  ul: {
    display: 'flex',
    flexDirection: 'column',
    listStyleType: 'none',
    /*border: 1px solid red,*/
    margin: 'auto',
    padding: '0px',
    alignItems: 'flex-start',
  },

  link: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: '20px',
    color: 'white',
    textDecoration: 'none',
    transition: 'color 0.5s ease-in-out',
    backgroundColor: 'transparent',
  },

  activeLink: {
    display: 'flex',
    color: theme.palette.secondary.main,
    fontWeight: 700,
    fontStyle: 'italic',
    backgroundColor: 'black',
    padding: '10px',
    paddingRight: '30px',
    '&::before': {
      content: '"_  "',
      fontWeight: 500,
      marginRight: '5px',
      color: 'white',
      display: 'flex',
      transition: 'width 0s ease',
    },
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='right' ref={ref} {...props} />
})

const DrawerComponent = (props) => {
  const classes = useStyles()
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.toggleDrawerHandler}
      TransitionComponent={Transition}
    >
      <Div100vh
        style={{
          display: 'flex',
          position: 'fixed',
          width: '100%',
          //border: '5px solid purple',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
        className={classes.background}
        onClick={props.toggleDrawerHandler}
        onKeyDown={props.toggleDrawerHandler}
        role='presentation'
      >
        <nav className={classes.nav}>
          <ul className={classes.ul}>
            {props.routes.map(({ name, route, partialy }) => (
              <li>
                <Link
                  className={classes.link}
                  activeClassName={classes.activeLink}
                  partiallyActive={partialy}
                  to={route}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Div100vh>
    </Dialog>
  )
}

export default DrawerComponent
