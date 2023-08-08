import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { useFormik } from 'formik'
import TextField from '@material-ui/core/TextField'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { MenuItem, Box } from '@material-ui/core'
import * as yup from 'yup'

const debug = false

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    gap: '30px',
    //border: '1px solid red',
    width: '100%',
  },
  field: {
    margin: '0',
    background: theme.palette.background.inputBackground,
    borderRadius: '0',
    width: '100%',
  },
  label: {
    color: theme.palette.text.primary,
    marginBottom: '10px',
    paddingLeft: '10px',
  },
  button: {},
  formControl: {
    width: '300px',
    background: theme.palette.background.inputBackground,
  },
  poper: {
    background: theme.palette.background.inputBackground,
  },
  input: {
    '&:invalid': {
      content: 'hola',
      border: 'red solid 1px',
    },
  },
}))

export default function PricingSchema({ formik }) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))


  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '')
    formik.handleChange
  }

  return (
    <React.Fragment>
      <Typography
        variant='h5'
        color='textPrimary'
        gutterBottom
      >
        Pricing schema
      </Typography>

      <Box
        className={classes.container}
        width='100%'
        flexDirection={matches ? 'row' : 'column'}
      >
        <Box display='flex' flexDirection='column' width='100%'>
          <TextField
            color='secondary'
            className={classes.field}
            margin='normal'
            label='Cost'
            name='cost'
            id='cost'
            type='number'
            InputLabelProps={{ classes: { root: classes.label } }}
            inputProps={{
              className: classes.input,
              pattern: '^[0-9]*[.,]?[0-9]*$',
              min: '0',
            }}
            value={formik.values.cost}
            onChange={formik.handleChange}
            required
            helperText={formik.touched.cost && formik.errors.cost}
            error={formik.touched.cost && Boolean(formik.errors.cost)}
            pattern='^[0-9]*[.,]?[0-9]*$'
          />
          <Typography variant='caption' color='inherit'>
            Must be a positive number
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column' width='100%'>
          <TextField
            color='secondary'
            className={classes.field}
            margin='normal'
            label='Charge schema'
            id='charge_schema'
            onChange={formik.handleChange('charge_schema')}
            InputLabelProps={{ classes: { root: classes.label } }}
            value={formik.values.charge_schema}
            required
            select
            SelectProps={{
              MenuProps: { classes: { paper: classes.poper } },
            }}
          >
            <MenuItem value={'PER_EXECUTION'}>Per execution</MenuItem>
            <MenuItem value={'PER_MINUTE'}>Per Minute</MenuItem>
          </TextField>
          <Typography variant='caption' color='inherit'>
            Must choose one option
          </Typography>
        </Box>
      </Box>

      {debug && (
        <>
          <pre style={{ textAlign: 'left' }}>
            <strong>Values</strong>
            <br />
            {JSON.stringify(formik.values, null, 2)}
          </pre>
          <pre style={{ textAlign: 'left' }}>
            <strong>Errors</strong>
            <br />
            {JSON.stringify(formik.errors, null, 2)}
          </pre>
        </>
      )}
    </React.Fragment>
  )
}
