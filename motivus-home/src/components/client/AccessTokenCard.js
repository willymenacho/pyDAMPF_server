import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import { navigate } from 'gatsby'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import { useSnackbar } from 'notistack'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles((theme) => ({
  backgroundDark: {
    background:
      'linear-gradient(-90deg, rgba(38,93,237,1) 0%, rgba(245,78,221,1) 100%)',
  },

  backgroundLight: {
    background:
      'linear-gradient(-90deg, rgba(93,37,202,1) 0%, rgba(231,51,255,1) 100%)',
  },

  root: {
    backgroundColor: theme.palette.background.default,
  },

  createDate: {
    fontFamily: 'Roboto Mono',
    fontWeight: '300',
  },

  lastused: {
    marginTop: '5px',
    fontWeight: '300',
  },
  separate: {
    borderColor: theme.palette.secondary.main,
    borderLeft: '4px solid',
  },
  white: {
    color: theme.palette.text.primary,
  },
  icon: {
    fill: theme.palette.primary.main,
    fontSize: '1.5rem',
    marginLeft: '5px',
    cursor: 'pointer',
  },
  dilogText: {
    color: theme.palette.text.primary,
  },
}))

export default function AccesTokenCard({
  name,
  publishDate,
  tokenId,
  model,
  id,
  valid,
  refreshData = () => null,
}) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const dark = theme.palette.type

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const { enqueueSnackbar } = useSnackbar()

  const updateActive = async () => {
    await model.update(id, { valid: !valid })
    refreshData()
  }

  const remove = async () => {
    try {
      await model.remove(id)
      enqueueSnackbar('Deleted successfully', { variant: 'success' })
      refreshData()
      handleClose()
    } catch (e) {
      enqueueSnackbar('Could not delete', { variant: 'error' })
    }
  }

  return (
    <React.Fragment>
      <Box
        className={
          dark === 'dark' ? classes.backgroundDark : classes.backgroundLight
        }
        display='flex'
        justifyContent='center'
        alignItems='center'
        paddingLeft='1px'
        paddingRight='1px'
        paddingTop='1px'
        paddingBottom='1px'
        marginBottom='30px'
      >
        <Box
          width='100%'
          display='flex'
          flexDirection={matches ? 'row' : 'column'}
          padding='10px'
          justifyContent='space-between'
          className={classes.root}
        >
          <Box>
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='space-between'
            >
              <Typography variant='h5'>{name}</Typography>
              <Box
                display='flex'
                flexDirection='row'
                className={classes.separate}
                pl='6px'
                ml='4px'
              >
                <Box
                  display='flex'
                  flexDirection='column'
                  mt='5px'
                  width='100%'
                  //border='1px solid red'
                >
                  <Box display='flex' alignItems='center'>
                    <Typography variant='h6' color='secondary'>
                      <span className={classes.white}>Token: </span>
                      {tokenId}
                    </Typography>

                    <FileCopyOutlinedIcon
                      className={classes.icon}
                      onClick={() => navigator.clipboard.writeText(tokenId)}
                    />
                  </Box>
                  <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    mt='5px'
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={valid}
                          onChange={updateActive}
                          name='valid'
                          color='primary'
                        />
                      }
                      label={valid ? 'Active' : 'Inactive'}
                    />
                  </Box>
                  <Typography variant='body1' className={classes.createDate}>
                    Created {publishDate}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            display='flex'
            flexDirection={matches ? 'column' : 'row'}
            alignItems={matches ? 'flex-end' : 'flex-start'}
            justifyContent={matches ? 'flex-end' : 'space-between'}
            mt={matches ? '0px' : '15px'}
            //border='2px solid green'
          >
            <Box
              height='100%'
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='flex-end'
              //border='1px solid red'
            >
              <Button
                variant='outlined'
                color='secondary'
                onClick={handleClickOpen}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-label='delete-confirmation'
      >
        <DialogTitle id='alert-dialog-title'>{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            className={classes.dilogText}
          >
            This action will permanently delete token: {tokenId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={remove}
            color='secondary'
            autoFocus
            variant='outlined'
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
