import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import { Box } from '@material-ui/core'

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

export default function PricingSchema({
  inputTitle,
  i,
  usersAndRole,
  rolesType,
  typeValue,
}) {
  const [value, setValue] = useState(usersAndRole[i].role)
  const classes = useStyles()

  const handleChange = (event) => {
    setValue(event.target.value)
    typeValue === 'role'
      ? (usersAndRole[i].role = event.target.value)
      : (typeValue = 'priceSchema'
          ? (usersAndRole[i].priceSchema = event.target.value)
          : null)
  }
  return (
    <React.Fragment>
      <Box>
        <Typography
          //className={classes.inputStatement}
          variant='body1'
          color='textPrimary'
        >
          {inputTitle}
        </Typography>
        <FormControl>
          <Select
            labelId='demo-customized-select-label'
            id='demo-customized-select'
            value={value}
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
            {rolesType.map((mi) => (
              <MenuItem value={mi.value}>{mi.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </React.Fragment>
  )
}
