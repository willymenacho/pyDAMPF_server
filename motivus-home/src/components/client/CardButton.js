import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { styled, useTheme, makeStyles } from '@material-ui/core/styles'
import WhiteArrow from '../../../static/whiteArrow.png'
import BlackArrow from '../../../static/blackArrow.png'
import { Box } from '@material-ui/core'

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.button.text,
  border: '1px solid',
  borderRadius: 0,
  borderColor: theme.palette.secondary.main,
  fontFamily: 'Asap',
  textTransform: 'capitalize',
  fontWeight: 700,
  fontStyle: 'italic',
  fontSize: '1.1rem',
  padding: 0,
  paddingRight: 15,
  paddingLeft: 15,
  margin: 0,
  boxShadow: '0px 0px 10px 1px  rgb(207, 100, 235, 0.3)',
  background: 'transparent',
  '&:hover': {
    boxShadow: '0px 0px 10px 1px  rgb(207, 100, 235, 0.4)',
  },
}))

const useStyles = makeStyles((theme) => ({
  LArrow: {
    background: '-webkit-linear-gradient(#eee, #333)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  white: {
    color: 'white',
  },
}))

export default function CardButton({
  children,
  arrow,
  themeDark,
  size,
  actionButton,
}) {
  const theme = useTheme()
  const classes = useStyles()
  const dark = themeDark === 'dark' ? 'dark' : theme.palette.type

  return (
    <React.Fragment>
      <StyledButton
        size={size === 'large' ? 'large' : 'medium'}
        className={themeDark === 'dark' ? classes.white : null}
        onClick={actionButton}
      >
        {children}
        <Box ml='8px' height='100%' display='flex ' alignItems='center'>
          {dark === 'dark' ? (
            <img src={WhiteArrow} alt='->' />
          ) : (
            <img src={BlackArrow} alt='->' />
          )}
        </Box>
      </StyledButton>
    </React.Fragment>
  )
}
