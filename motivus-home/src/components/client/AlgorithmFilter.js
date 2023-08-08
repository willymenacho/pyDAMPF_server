import React from 'react'
import { Box, Typography } from '@material-ui/core'
import '../../components/layout.css'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  backgroundTexture: {
    backgroundColor: '#ffffff',
    opacity: 1,
    backgroundImage: theme.palette.background.langSelectorTexture,
    backgroundSize: '8px 8px',
  },
  fade: {
    background: theme.palette.background.langSelectorFade,
  },
  body: {
    backgroundColor: theme.palette.background.langSelector,
  },
  title: {
    color: theme.palette.text.white,
  },
  underLine: { borderColor: 'red' },

  label: {
    display: 'block',
  },
  input: {
    width: 200,
  },

  autocompleteTextfield: {
    backgroundColor: '#ffffff',
  },
  popper: {
    borderRadius: 0,
    backgroundColor: theme.palette.background.langSelector,
    color: '#ffffff',
  },
  popperList: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}))

export default function AlgorithmFilter({ data, variant }) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <Box
      id='root'
      width='100%'
      display='flex'
      ml={variant === 'home' ? '0%' : '-2%'}
      alignItems='center'
      flexDirection='column'
      mb={matches ? '0px' : '60px'}
    >
      <Box
        display='flex'
        width='100%'
        height='100px'
        mt='20px'
        className={classes.backgroundTexture}
      >
        <Box
          width='100%'
          height='100px'
          display='flex'
          justifyContent={variant === 'home' ? 'center' : 'flex-start'}
          className={classes.fade}
        >
          <Box
            mt='25px'
            width='90%'
            height={matches ? '100px' : '120px'}
            className={classes.body}
            display='flex'
            flexDirection={matches ? 'row' : 'column'}
            justifyContent={
              variant === 'home'
                ? matches
                  ? 'center'
                  : 'space-evenly'
                : matches
                  ? 'flex-start'
                  : 'space-evenly'
            }
            alignItems={
              variant === 'home' ? 'center' : matches ? 'center' : 'flex-start'
            }
            pl={matches ? '0px' : '15px'}
          >
            <Box
              display='flex'
              width={matches ? 'auto' : '230px'}
              flexDirection={matches ? 'column' : 'row'}
              justifyContent={matches ? 'center' : 'space-between'}
              alignItems={matches ? 'flex-start' : 'flex-end'}
              ml={matches ? '2%' : '0%'}
              pr={matches ? '30px' : '0px'}
            >
              <Typography className={classes.title} variant='h4'>
                Motivus
              </Typography>
              <Typography variant='h5' color='secondary'>
                Marketplace
              </Typography>
            </Box>
            <Box display='flex' alignContent='flex-end'>
              {/* <ComboBox data={data} /> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function ComboBox({ data }) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <Autocomplete
      id='combo-box-demo'
      options={data}
      getOptionLabel={(option) => option.name}
      style={{ width: matches ? 400 : 300 }}
      classes={{ paper: classes.popper, option: classes.popperList }}
      renderInput={(params) => (
        <TextField
          className={classes.autocompleteTextfield}
          {...params}
          label='Algorithm search'
          variant='filled'
        />
      )}
    />
  )
}
