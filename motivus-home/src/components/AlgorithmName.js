import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'

import TextField from '@material-ui/core/TextField'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { MenuItem, Box } from '@material-ui/core'

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
      //border: '2px solid #c83737',
      textDecorationLine: 'line-through',
      textDecorationColor: '#c83737',
      textDecorationThickness: '3px',
    },
  },
}))

/*const validationSchema = Yup.object().shape({
  algorithm_users: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('User name is required'),
      default_charge_schema: Yup.mixed()
        .oneOf(['per_execution', 'per_minute'])
        .required('you must choose an option'),
      credits: Yup.number().positive('Credits must be positive'),
    }),
  ),
})*/

export default function AlgorithmName({ formik, disabled }) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <React.Fragment>
      <Box className={classes.container} flexDirection='row'>
        <Box display='flex' width='100%' flexDirection='column'>
          <TextField
            disabled={disabled}
            color='secondary'
            className={classes.field}
            margin='normal'
            label='Algorithm Name'
            id='name'
            InputLabelProps={{ classes: { root: classes.label } }}
            inputProps={{
              className: classes.input,
              pattern: '^[a-z0-9]+([-_s]{1}[a-z0-9]+)*$',
            }}
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            helperText={formik.touched.name && formik.errors.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
          />
          <Typography variant='caption' color='inherit'>
            Please only use: lowercase, hyphen and numbers{' '}
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

/*<Box>
<Box display='flex' width='100%' justifyContent='space-betwenn'>
          <AlgorithmsInputSelec
            input={schema}
            setInput={setSchema}
            values={schemaType}
            text='Schema options:'
          />

          <Box ml='40px' />
          <AlgorithmInput
            inputTitle='credits *'
            input={credits}
            setInput={setCredits}
            numeric={true}
          />
        </Box>
      </Box>*/

/*<TextField
      color='secondary'
      className={classes.field}
      margin='normal'
      label='Charge schema'
      name={default_charge_schema}
      onChange={handleChange}
      InputLabelProps={{ classes: { root: classes.label } }}
      value={user.default_charge_schema}
      onBlur={handleBlur}
      required
      select
      SelectProps={{
        MenuProps: { classes: { paper: classes.poper } },
      }}
      helperText={
        touchedDefault_charge_schema && errorDefault_charge_schema
          ? errorDefault_charge_schema
          : ''
      }
      error={Boolean(
        touchedDefault_charge_schema && errorDefault_charge_schema,
      )}
    >
      <MenuItem value={'per_execution'}>Per execution</MenuItem>
      <MenuItem value={'per_minute'}>Per Time</MenuItem>
    </TextField>*/
