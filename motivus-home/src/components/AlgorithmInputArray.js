import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import { Box } from '@material-ui/core'
import { AnimatePresence, motion } from 'framer-motion'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  input: {
    width: '100%',
    color: '#fff',
    fontSize: '1.2rem',
  },
  inputStatement: {
    fontFamily: 'Roboto Mono',
    fontSize: '1.2rem',
  },
  inputText: {
    marginTop: '2px',
    fontSize: '1.2rem',
    fontWeight: '400',
  },
  inputBackground: {
    background: theme.palette.background.inputBackground,
  },
  inputSelector: {
    background: theme.palette.secondary.main,
  },
  divider: {
    background: theme.palette.text.primary,
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
}))

export default function AlgorithmInput({
  inputTitle,
  numeric,
  i,
  input,
  ...props
}) {
  const [focus, setFocus] = useState(false)
  const [active, setActive] = useState(false)
  //const [value, setValue] = useState('')
  const classes = useStyles()

  useEffect(() => {
    if (focus === true) {
      setActive(false)
    } else if (props.value) {
      setActive(false)
    } else {
      setActive(true)
    }
  }, [focus, props.value])

  /*function handleChange(e) {
    setValue(e.target.value)
    typeValue === 'user'
      ? (input[i].user = e.target.value)
      : typeValue === 'credits'
      ? (input[i].credits = e.target.value)
      : null
  }*/

  return (
    <Box display='flex' flexDirection='column' width='100%'>
      <AnimatePresence exitBeforeEnter>
        <Typography
          //className={classes.inputStatement}
          variant='body1'
          color='textPrimary'
        >
          {inputTitle}
        </Typography>
        <Box
          width='100%'
          className={classes.inputBackground}
          px={1}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        >
          <InputBase
            className={classes.input}
            onKeyPress={
              numeric
                ? (event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault()
                    }
                  }
                : null
            }
            {...props}
            inputProps={{ 'aria-label': 'naked' }}
            type={numeric ? 'numeric' : 'text'}
          />
        </Box>

        <Box
          height='3px'
          width='100%'
          component={motion.div}
          className={classes.inputSelector}
          animate={{ opacity: active ? 0 : 1 }}
        />
      </AnimatePresence>
    </Box>
  )
}
