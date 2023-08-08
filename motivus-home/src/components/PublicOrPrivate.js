import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  inputStatement: {
    fontFamily: 'Roboto Mono',
    fontSize: '1.2rem',
  },

  secondary: {
    color: theme.palette.secondary.main,
  },
}))

export default function PublicOrPrivate({ formik }) {
  const classes = useStyles()
  const [value, setValue] = React.useState('public')

  return (
    <RadioGroup
      aria-label='public'
      id='is_public'
      name='is_public'
      value={formik.values.is_public}
      onChange={(e) =>
        formik.setFieldValue('is_public', e.target.value === 'true')
      }
    >
      <FormControlLabel value={true} control={<Radio />} label='Public' />
      <FormControlLabel value={false} control={<Radio />} label='Private' />
    </RadioGroup>
  )
}
