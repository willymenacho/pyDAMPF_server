import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Box, makeStyles, TextField, Typography } from '@material-ui/core'
import SettingTitle from '../components/client/SettingsTitle'
import AccesTokenCard from '../components/client/AccessTokenCard'
import Button from '@material-ui/core/Button'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles((theme) => ({
  createTokenDark: {
    color: theme.palette.calypso?.main,
    borderColor: theme.palette.calypso?.main,
  },

  createTokenLight: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
}))

const validationSchema = yup.object({
  description: yup
    .string('Enter a description')
    .required('Enter a description'),
})

const withTokenImplementation = ({
  model,
  sectionName,
  entity,
  description,
}) => (Component) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const { enqueueSnackbar } = useSnackbar()
  const dark = theme.palette.type
  const [tokens, setTokens] = React.useState([])

  const [open, setOpen] = React.useState(false)

  const getTokens = async () => {
    const tokens_ = await model.all()
    setTokens(tokens_)
  }
  React.useEffect(() => {
    getTokens()
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const formik = useFormik({
    initialValues: { description: '' },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await model.create(values)
      enqueueSnackbar(`${entity} created successfully`, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
      getTokens()
      handleClose()
    },
  })

  return (
    <React.Fragment>
      <SettingTitle text={`${entity}s`} />
      <Box
        mb='30px'
        display='flex'
        alignItems='flex-start'
        flexDirection={matches ? 'row' : 'column'}
        justifyContent='space-between'
      >
        <Typography variant='body1' color='textPrimary' gutterBottom>
          Create, delete and manage your tokens
        </Typography>
        <Box display='flex' justifyContent='flex-end'>
          <Button
            variant='outlined'
            className={
              dark === 'dark'
                ? classes.createTokenDark
                : classes.createTokenLight
            }
            onClick={handleClickOpen}
          >
            Create {entity}
          </Button>
        </Box>
      </Box>
      {tokens.map((t) => (
        <AccesTokenCard
          model={model}
          key={`${sectionName}-${t.id}`}
          name={t.description}
          tokenId={t.value}
          id={t.id}
          publishDate={t.inserted_at}
          refreshData={getTokens}
          valid={t.valid}
        />
      ))}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-label={`new-${sectionName}`}
      >
        <DialogTitle id='form-dialog-title'>{entity}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='description'
            label='Description'
            fullWidth
            onChange={formik.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={formik.submitForm} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
export default withTokenImplementation
