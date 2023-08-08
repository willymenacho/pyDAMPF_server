import React, { useEffect, useState } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  inputStatement: {
    fontFamily: 'Roboto Mono',
    fontSize: '1.2rem',
  },
  nRoot: {
    width: '300px',
    backgroundColor: theme.palette.background.inputBackground,
    padding: '10px',
    fontSize: '1.2rem',
    fontFamily: 'Roboto',
    '&:focus': {
      background: theme.palette.background.inputBackground,
    },
  },
  poper: {
    backgroundColor: theme.palette.background.inputBackground,
    padding: '0px',
    borderRadius: '0px',
  },
  list: {
    fontSize: '1.2rem',
    fontFamily: 'Roboto',
  },
}))

export default function AlgorithmsInputSelec({
  input,
  setInput,
  values,
  text,
}) {
  const classes = useStyles()

  const handleChange = (event) => {
    setInput(event.target.value)
  }
  return (
    <Box display='flex' flexDirection='column'>
      <Typography variant='body1' color='textPrimary'>
        {text}
      </Typography>
      <FormControl>
        <Select
          labelId='demo-customized-select-label'
          id='demo-customized-select'
          value={input}
          onChange={handleChange}
          classes={{
            selectMenu: classes.selectMenu,
            nativeInput: classes.nativeInput,
            root: classes.nRoot,
          }}
          MenuProps={{
            classes: { paper: classes.poper, list: classes.list },
          }}
        >
          {values.map((v) => (
            <MenuItem value={v.value}>{v.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
