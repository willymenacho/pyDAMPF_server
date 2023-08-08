import React from 'react'
import PropTypes from 'prop-types'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { dark } from '@material-ui/core/styles/createPalette'
import { typography } from './BaseTheme'

const DarkTheme = createTheme({
  typography,

  palette: {
    type: 'dark',

    primary: {
      light: '#9455fe',
      main: '#8657E1',
      dark: '#1a0098',
      contrastText: '#fff',
    },

    secondary: {
      light: '#ff8fff',
      main: '#cc5de7',
      dark: '#98D8b4',
      contrastText: '#fff',
    },

    calypso: {
      main: '#60EFD1',
    },

    background: {
      paper: '#2C2771',
      headerBackground: '#2C2771',
      paperGradient:
        'linear-gradient(135deg, #2C2771 0%, #5D25CA 85%  ,#8641D8 100%)',
      borderGradient: 'linear-gradient(135deg, #265DED 50%, #F54EDD 100%)',
      filter: 'linear-gradient(180deg, #8657E1 0%, #6AB8B8 100%)',
      default: '#131144',
      langSelector: '#000000',
      langSelectorTexture: 'radial-gradient(#fff 0.1px, #131144 1px)',
      langSelectorFade:
        'linear-gradient(90deg, rgba(19, 17, 68,1) 0%, rgba(19, 17, 68,0) 5%, rgba(19, 17, 68,0) 95%, rgba(19, 17, 68,1) 100%)',
      inputBackground: '#000',
    },

    text: {
      primary: '#ffffff',
      secondary: '#424242',
      white: '#ffffff',
    },

    button: {
      text: '#ffffff',
    },
  },
  shadows: [
    'none',
    '0px 0px 8px 0px rgb(213, 51, 255, 0.3)',
    '0px 0px 8px 1px rgb(213, 51, 255, 0.4)',
  ],

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

/*const nivoTheme = {
  color: '#FFFFFF',
}*/

const ThemeD = ({ children }) => {
  return <ThemeProvider theme={DarkTheme}>{children}</ThemeProvider>
}

ThemeD.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ThemeD
