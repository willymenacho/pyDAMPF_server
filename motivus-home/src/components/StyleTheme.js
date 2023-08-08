import React from 'react'
import PropTypes from 'prop-types'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

const theme2 = createTheme({
  typography: {
    fontFamily: 'Asap',

    h1: {
      fontWeight: '700',
      fontStyle: 'italic',
      fontSize: '5rem',
      lineHeight: 1.334,
      letterSpacing: '0em',
    },

    h2: {
      fontWeight: '600',
      fontStyle: 'italic',
      fontSize: '3rem',
      lineHeight: 1.2,
      letterSpacing: '0em',
    },

    h3: {
      fontWeight: '500',
      fontStyle: 'italic',
      fontSize: '2.5rem',
      lineHeight: 1.167,
      letterSpacing: '0em',
    },

    h4: {
      fontWeight: '400',
      fontStyle: 'italic',
      fontSize: '1.85rem',
      lineHeight: 1.235,
      letterSpacing: '0em',
    },

    h5: {
      fontWeight: '600',
      fontFamily: 'Roboto',
      fontSize: '1.2rem',
      lineHeight: 1.334,
      letterSpacing: '0em',
    },

    h6: {
      fontWeight: '500',
      fontFamily: 'Roboto',
      fontSize: '1rem',
      lineHeight: 1.25,
      letterSpacing: '0em',
    },

    subtitle1: {
      fontWeight: '400',
      fontFamily: 'Roboto',
      fontSize: '1rem',
      lineHeight: 1.75,
      letterSpacing: '0em',
    },

    subtitle2: {
      fontWeight: '400',
      fontFamily: 'Roboto',
      fontSize: '0.875rem',
      lineHeight: 1.58,
      letterSpacing: '0em',
    },

    body1: {
      fontWeight: '400',
      fontFamily: 'Roboto',
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0em',
    },

    body2: {
      fontWeight: '300',
      fontFamily: 'Roboto',
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0em',
    },

    caption: {
      fontFamily: 'Roboto',
      fontWeight: 300,
      fontSize: '0.85rem',
    },

    /*----------------------artilce-----------------*/

    articleTitle: {
      fontFamily: 'Asap',
      fontWeight: '800',
      fontStyle: 'italic',
      fontSize: '2.2rem',
      lineHeight: 1.334,
      letterSpacing: '0em',
    },

    lang: {
      fontWeight: '500',
      fontFamily: 'Roboto',
      fontSize: '0.9rem',
      lineHeight: 1.1,
      letterSpacing: '0em',
    },
    introduction: {
      fontWeight: '500',
      fontFamily: 'Roboto',
      fontSize: '0.95rem',
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
  },

  palette: {
    primary: {
      light: '#9455fe',
      main: '#5d25ca',
      dark: '#1a0098',
      contrastText: '#fff',
    },

    secondary: {
      light: '#ff8fff',
      main: '#cc5de7',
      dark: '#9828b4',
      contrastText: '#fff',
    },

    background: {
      paper: '#fff',
      default: '#fff',
      langSelector: '#1E1E1E',
      langSelectorTexture: 'radial-gradient(#000 0.1px, #fff 1px)',
      langSelectorFade:
        'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 95%, rgba(255,255,255,1) 100%)',
    },

    text: {
      primary: '#000000',
      secondary: '#424242',
      white: '#fff',
    },
  },

  overrides: {
    MuiTypography: {
      gutterBottom: {
        marginBottom: 16,
      },
    },
  },
  MuiTab: {
    // Name of the rule
    textColorSecondary: {
      // Some CSS
      color: '#aaa',
    },
  },
})

const Theme2 = ({ children }) => {
  return <ThemeProvider theme={theme2}>{children}</ThemeProvider>
}

Theme2.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Theme2
