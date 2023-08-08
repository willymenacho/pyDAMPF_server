import React from 'react'
import { Formik, Form, FieldArray, Field, getIn } from 'formik'
import TextField from '@material-ui/core/TextField'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Select, MenuItem, Button, Box } from '@material-ui/core'
import * as Yup from 'yup'

const default_charge_schema = [
  { name: 'Per execution', value: 'per-execution' },
  { name: 'Per Time', value: 'per-time' },
]

const initialValues = {
  algorithm_users: [
    {
      id: Math.random(),
      name: '',
      default_charge_schema: '',
      credits: '',
    },
  ],
}

const validationSchema = Yup.object().shape({
  algorithm_users: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('User name is required'),
      default_charge_schema: Yup.mixed()
        .oneOf(['per_execution', 'per_minute'])
        .required('you must choose an option'),
      credits: Yup.number().positive('Credits must be positive'),
    }),
  ),
})

const debug = false

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    gap: '30px',
    //border: '1px solid red',
    width: '100%',
    marginBottom: '20px',
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
}))

export default function userList({ usersList, setUsersList }) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        //console.log('onSubmit', JSON.stringify(values, null, 2))
      }}
      render={({ values, errors, touched, handleChange, handleBlur }) => {
        return (
          <Form>
            <FieldArray
              name='algorithm_users'
              render={({ remove, push }) => (
                <div>
                  {values.algorithm_users.map((user, index) => {
                    const name = `algorithm_users.${index}.name`
                    const touchedName = getIn(touched, name)
                    const errorName = getIn(errors, name)

                    const default_charge_schema = `algorithm_users.${index}.default_charge_schema`
                    const touchedDefault_charge_schema = getIn(
                      touched,
                      default_charge_schema,
                    )
                    const errorDefault_charge_schema = getIn(
                      errors,
                      default_charge_schema,
                    )

                    const credits = `algorithm_users.${index}.credits`
                    const touchedCredits = getIn(touched, credits)
                    const errorCredits = getIn(errors, credits)

                    //console.log(errorDefault_charge_schema)
                    //console.log(touchedDefault_charge_schema)
                    return (
                      <Box
                        className={classes.container}
                        key={user.id}
                        flexDirection={matches ? 'row' : 'column'}
                      >
                        <TextField
                          color='secondary'
                          className={classes.field}
                          margin='normal'
                          label='User Name'
                          name={name}
                          InputLabelProps={{ classes: { root: classes.label } }}
                          value={user.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          helperText={touchedName && errorName ? errorName : ''}
                          error={Boolean(touchedName && errorName)}
                        />
                        <TextField
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
                            touchedDefault_charge_schema &&
                            errorDefault_charge_schema
                              ? errorDefault_charge_schema
                              : ''
                          }
                          error={Boolean(
                            touchedDefault_charge_schema &&
                              errorDefault_charge_schema,
                          )}
                        >
                          <MenuItem value={'per_execution'}>
                            Per execution
                          </MenuItem>
                          <MenuItem value={'per_minute'}>Per Time</MenuItem>
                        </TextField>

                        <TextField
                          color='secondary'
                          className={classes.field}
                          margin='normal'
                          label='Credits'
                          name={credits}
                          onChange={(e) =>
                            /^[+]?\d*(?:[.,]\d*)?$/.test(e.target.value)
                              ? handleChange(e)
                              : e.stopPropagation() && false
                          }
                          InputLabelProps={{ classes: { root: classes.label } }}
                          value={user.credits}
                          onBlur={handleBlur}
                          required
                          helperText={
                            touchedCredits && errorCredits ? errorCredits : ''
                          }
                          error={Boolean(touchedCredits && errorCredits)}
                        />

                        <Button
                          className={classes.button}
                          margin='normal'
                          type='button'
                          color='secondary'
                          variant='outlined'
                          onClick={() => remove(index)}
                        >
                          x
                        </Button>
                      </Box>
                    )
                  })}

                  {debug && (
                    <>
                      <pre style={{ textAlign: 'left' }}>
                        <strong>Values</strong>
                        <br />
                        {JSON.stringify(values, null, 2)}
                      </pre>
                      <pre style={{ textAlign: 'left' }}>
                        <strong>Errors</strong>
                        <br />
                        {JSON.stringify(errors, null, 2)}
                      </pre>
                    </>
                  )}
                  <Button
                    type='button'
                    variant='outlined'
                    color='secondary'
                    size='large'
                    onClick={() =>
                      push({
                        id: Math.random(),
                        name: '',
                        default_charge_schema: '',
                        credits: '',
                      })
                    }
                  >
                    add User
                  </Button>
                </div>
              )}
            />
          </Form>
        )
      }}
    />
  )
}

const CustomizedSelectForFormik = ({ children, form, field, ...props }) => {
  const { name, value } = field
  const { setFieldValue, onBlur } = form
  const classes = useStyles()

  return (
    <Select
      {...props}
      onClose={onBlur}
      MenuProps={{ classes: { paper: classes.poper } }}
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value)
      }}
    >
      {children}
    </Select>
  )
}

/* <AlgorithmInputArray
                  inputTitle='User'
                  numeric={false}
                  input={usersList}
                  i={i}
                  typeValue='user'
                />
                <Box ml='40px' />
                <AlgorithmsInputSelectArray
                  inputTitle='Pricing schema'
                  i={i}
                  setInput={setUsersList()}
                  usersAndRole={usersList}
                  rolesType={default_charge_schema}
                  typeValue='priceSchema'
                />
                <Box ml='40px' />
                <AlgorithmInputArray
                  inputTitle='Credits'
                  numeric={true}
                  input={usersList}
                  i={i}
                  typeValue='credits'
                />
                <button
                  onClick={() =>
                    setUsersList(usersList.filter((e, _i) => i !== _i))
                  }
                >
                  eliminar
                </button>*/

/*<FormControl
                          className={classes.formControl}
                          color='secondary'
                          error={Boolean(
                            touchedDefault_charge_schema &&
                              errorDefault_charge_schema,
                          )}
                        >
                          <InputLabel className={classes.label}>
                            Price schema
                          </InputLabel>
                          <Field
                            name={`algorithm_users.${index}.default_charge_schema`}
                            component={(props) => (
                              <CustomizedSelectForFormik required {...props} />
                            )}
                          >
                            <MenuItem value={'per_execution'}>
                              Per execution
                            </MenuItem>
                            <MenuItem value={'per_minute'}>Per Time</MenuItem>
                          </Field>
                          <FormHelperText>
                            {touchedDefault_charge_schema &&
                            errorDefault_charge_schema
                              ? errorDefault_charge_schema
                              : ''}
                          </FormHelperText>
                        </FormControl>*/
