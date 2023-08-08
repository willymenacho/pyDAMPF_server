import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import IconButton from '@material-ui/core/IconButton'
import { Grow, useTheme } from '@material-ui/core'
import { useForm, ValidationError } from '@formspree/react'
import { SnackbarProvider, useSnackbar } from 'notistack'

const useStylesReddit = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    color: 'white',
  },

  customHoverFocus: {
    color: theme.palette.secondary.light,
  },

  underline: {
    color: theme.palette.common.white,
    borderBottom: theme.palette.common.white,
    '&:after': {
      borderBottom: `3px solid ${theme.palette.secondary.light}`,
    },
    '&:focused::after': {
      borderBottom: `3px solid ${theme.palette.secondary.light}`,
    },
    '&:before': {
      borderBottom: `0.5px solid ${theme.palette.common.white}`,
    },
    '&:hover:not($disabled):not($focused):not($error):before': {
      borderBottom: '0.5px solid rgb(255, 255, 255) !important',
    },
    '&$disabled:before': {
      borderBottom: `0.5px dotted ${theme.palette.common.white}`,
    },
  },
}))

const useStylesRedditLabel = makeStyles((theme) => ({
  cssLabel: {
    color: 'white',
    '&.Mui-focused': {
      color: theme.palette.secondary.light,
    },
  },

  cssFocused: {},
}))

function CustomeTextField(props) {
  const classes = useStylesReddit()
  const classeslabel = useStylesRedditLabel()

  return (
    <TextField
      InputProps={{ classes, disableUnderline: false }}
      InputLabelProps={{
        classes: {
          root: classeslabel.cssLabel,
          focused: classeslabel.cssFocused,
        },
      }}
      {...props}
    />
  )
}

function CustomButton(props) {
  const classes = useStylesReddit()

  return <IconButton className={classes.customHoverFocus} {...props} />
}

export default function ContactUsForm({ onClose, ...props }) {
  const [state, handleSubmit] = useForm('xzbkkogo')
  const { enqueueSnackbar } = useSnackbar()

  React.useEffect(() => {
    if (state.succeeded) {
      enqueueSnackbar('Thank you for your message!', {
        variant: 'info',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        preventDuplicate: true,
      })
      setTimeout(() => onClose(), 3500)
    }
  }, [enqueueSnackbar, onClose, state.succeeded])

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        item
        xs={12}
        container
        direction='row'
        justify='flex-end'
        alignItems='flex-start'
      >
        <Grow in timeout={1000}>
          <CustomButton aria-label='close' onClick={onClose}>
            <CancelOutlinedIcon fontSize='large' />
          </CustomButton>
        </Grow>
      </Grid>

      <Grid container spacing={8}>
        <Grid item xs={12} sm={12}>
          <Grow in timeout={1000}>
            <CustomeTextField
              required
              id='name'
              name='name'
              label='Name'
              fullWidth
              autoComplete='given-name'
            />
          </Grow>
          <ValidationError prefix='Name' field='name' errors={state.errors} />
        </Grid>

        <Grid item xs={12}>
          <Grow in timeout={2000}>
            <CustomeTextField
              required
              id='email'
              name='email'
              label='Email address'
              fullWidth
              autoComplete='give-email'
            />
          </Grow>
          <ValidationError prefix='Email' field='email' errors={state.errors} />
        </Grid>

        <Grid item xs={12}>
          <Grow in timeout={2500}>
            <CustomeTextField
              id='telephone'
              name='telephone'
              label='Telephone'
              fullWidth
              autoComplete='give-telephon'
            />
          </Grow>
          <ValidationError
            prefix='Telephone'
            field='telephone'
            errors={state.errors}
          />
        </Grid>
        <Grid item xs={12}>
          <Grow in timeout={3000}>
            <CustomeTextField
              required
              id='country'
              name='country'
              label='Country'
              fullWidth
              autoComplete='give-country'
            />
          </Grow>
          <ValidationError
            prefix='Country'
            field='country'
            errors={state.errors}
          />
        </Grid>
        <Grid item xs={12}>
          <Grow in timeout={3500}>
            <CustomeTextField
              id='message'
              required
              name='message'
              label='Your message'
              multiline
              rows={3}
              fullWidth
            />
          </Grow>
          <ValidationError
            prefix='Message'
            field='message'
            errors={state.errors}
          />
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction='row'
          justify='flex-end'
          alignItems='flex-start'
        >
          <Grow in timeout={3500}>
            <Button
              color='secondary'
              variant='outlined'
              size='large'
              type='submit'
              disabled={state.submitting || state.succeeded}
            >
              {' '}
              Send message{' '}
            </Button>
          </Grow>
        </Grid>
      </Grid>
    </form>
  )
}
