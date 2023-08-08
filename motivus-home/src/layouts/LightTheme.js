import React from 'react'
import PropTypes from 'prop-types'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { typography } from './BaseTheme'

const themeLight = createTheme({
  typography,
  palette: {
    type: 'light',

    primary: {
      light: '#9455fe',
      main: '#8657E1',
      dark: '#1a0098',
      contrastText: '#fff',
    },

    secondary: {
      light: '#ff8fff',
      main: '#cc5de7',
      dark: '#9828b4',
      contrastText: '#fff',
    },

    calypso: {
      main: '#6AB8B8',
    },

    background: {
      paper: '#FFFFFF',
      headerBackground: '#2C2771',
      paperGradient: 'linear-gradient(180deg, #F0EEEE 60%, #FFFFFF 100%)',
      borderGradient: 'linear-gradient(135deg, #ACACAC 0%, #FFFFFF 100%)',
      filter: 'linear-gradient(180deg, #8657E1 0%, #FF72EB 100%)',
      default: '#ffffff',
      langSelector: '#1E1E1E',
      langSelectorTexture: 'radial-gradient(#000 0.1px, #fff 1px)',
      langSelectorFade:
        'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 95%, rgba(255,255,255,1) 100%)',
      inputBackground: '#E4E4E4',
    },

    text: {
      primary: '#000000',
      secondary: '#424242',
      white: '#ffffff',
    },

    button: {
      text: '#2C2771',
    },
  },
  shadows: [
    'none',
    '1px 3px 2px 0px rgb(0, 0, 0, 0.2)',
    '1px 3px 2px 1px rgb(0, 0, 0, 0.3)',
  ],
  shape: {
    borderRadius: 0,
  },
})
const { breakpoints } = themeLight
const theme = {
  ...themeLight,
  overrides: {
    MuiTypography: {
      h1: {
        [breakpoints.down('xs')]: {
          fontSize: '2.7rem',
        },
      },
      h2: {
        [breakpoints.down('xs')]: {
          fontSize: '2.4rem',
        },
      },
      h3: {
        [breakpoints.down('xs')]: {
          fontSize: '2rem',
        },
      },
      h4: {
        [breakpoints.down('xs')]: {
          fontSize: '1.5rem',
        },
      },
      h5: {
        [breakpoints.down('xs')]: {
          fontSize: '1.2rem',
        },
      },
      h6: {
        [breakpoints.down('xs')]: {
          fontSize: '1rem',
        },
      },
      body1: {
        [breakpoints.down('xs')]: {
          fontSize: '0.8rem',
        },
      },
      body2: {
        [breakpoints.down('xs')]: {
          fontSize: 'rem',
        },
      },
    },
  },
}

const ThemeL = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

ThemeL.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ThemeL
