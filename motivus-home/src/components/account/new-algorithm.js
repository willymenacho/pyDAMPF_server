import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Title from '../client/Title'
import { Box } from '@material-ui/core'
import PublicOrPrivate from '../PublicOrPrivate'
import PricingSchema from '../PricingSchema'
import Permissions from '../Permissions'
import UsersList from '../usersList'
import Button from '@material-ui/core/Button'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AlgorithmName from '../AlgorithmName'
import withClientLayout from '../../hoc/withClientLayout'
import { Algorithm } from '../../models'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { pick } from 'lodash'
import { navigate } from 'gatsby-link'

const useStyles = makeStyles((theme) => ({
  divider: {
    background: theme.palette.text.primary,
  },
  darkButton: {
    color: theme.palette.calypso?.main,
    borderColor: theme.palette.calypso?.main,
  },

  lightButton: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
}))

const validationSchema = yup.object({
  name: yup.string('Enter your name').required('Enter your name'),
  cost: yup.number('Enter a Cost').required('Enter a Cost'),
  charge_schema: yup
    .mixed()
    .oneOf(['PER_EXECUTION', 'PER_MINUTE'])
    .required('you must choose an option'),
})

function NewAlgorithmForms({ update, algorithm, refreshData }) {
  const classes = useStyles()
  const theme = useTheme()
  const dark = theme.palette.type
  const matches = useMediaQuery(theme.breakpoints.up('lg'))

  const formik = useFormik({
    initialValues: update
      ? pick(algorithm, ['name', 'is_public', 'cost', 'charge_schema'])
      : {
          name: '',
          is_public: false,
          cost: 0,
          charge_schema: 'PER_EXECUTION',
        },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (update) {
        Algorithm.update(algorithm.id, values)
        enqueueSnackbar('updating algorithm', {
          variant: 'info',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          preventDuplicate: true,
        })
        navigate('/account/my-algorithms')
      } else {
        const algorithm = await Algorithm.create(values)
        enqueueSnackbar('creating algorithm', {
          variant: 'info',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          preventDuplicate: true,
        })
        navigate(`/account/my-algorithms/edit/${algorithm.id}`)
      }
    },
  })

  const { enqueueSnackbar } = useSnackbar()

  return (
    <form onSubmit={formik.handleSubmit}>
      <Title
        text={update ? `Edit ${algorithm.name}` : 'Create a New Algorithm'}
      />
      <Box mt='50px' width={matches ? '70%' : '90%'}>
        <AlgorithmName formik={formik} disabled={update} />
      </Box>
      <DividerNew />
      <PublicOrPrivate formik={formik} />
      <DividerNew />
      <section aria-label='pricing-schema'>
        <Box width={matches ? '70%' : '90%'}>
          <PricingSchema formik={formik} />
        </Box>
      </section>
      <DividerNew />
      {update && (
        <React.Fragment>
          <Box width={matches ? '70%' : '90%'}>
            <section aria-label='permissions'>
              <Typography variant='h5' color='textPrimary' gutterBottom>
                Permissions
              </Typography>
              <Permissions
                users={algorithm.users}
                algorithmId={algorithm.id}
                refreshData={refreshData}
              />
            </section>
          </Box>
          <DividerNew />
          <Box width={matches ? '70%' : '90%'}>
            <section aria-label='user list'>
              <Typography variant='h5' color='textPrimary' gutterBottom>
                User List
              </Typography>
              <Permissions
                users={algorithm.users}
                algorithmId={algorithm.id}
                refreshData={refreshData}
                userList
              />
            </section>
          </Box>
          <DividerNew />
        </React.Fragment>
      )}
      <Button
        size='large'
        variant='outlined'
        type='submit'
        className={dark === 'dark' ? classes.darkButton : classes.lightButton}
      >
        {update ? 'Update algorithm' : 'Submit algorithm'}
      </Button>
      <Box mb={matches ? '20px' : '70px'} />
    </form>
  )
}

function DividerNew() {
  const classes = useStyles()
  return <Box my='30px' height='1px' width='100%' className={classes.divider} />
}

export default withClientLayout(NewAlgorithmForms)
