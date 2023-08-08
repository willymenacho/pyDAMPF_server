import React from 'react'
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputBase from '@material-ui/core/InputBase'
import { Box, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 0,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: ['Roboto'].join(','),
    '&:focus': {
      borderRadius: 0,
      borderColor: theme.palette.secondary.light,
      boxShadow: '0 0 0 0.2rem  rgb(213, 51, 255, 0.4)',
    },
  },
}))(InputBase)

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
}))

export default function ControlledOpenSelect({
  languages,
  lang,
  setLang,
  variant,
}) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const [open, setOpen] = React.useState(false)

  const handleChange = (event) => {
    setLang(event.target.value)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

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
        height={matches ? '100px' : '150px'}
        mt='30px'
        className={classes.backgroundTexture}
      >
        <Box
          width='100%'
          height={matches ? '100px' : '150px'}
          display='flex'
          justifyContent={variant === 'home' ? 'center' : 'flex-start'}
          className={classes.fade}
        >
          <Box
            mt='30px'
            width={matches ? '85%' : '90%'}
            height={matches ? '100px' : '150px'}
            className={classes.body}
            display='flex'
            justifyContent={
              variant === 'home'
                ? matches
                  ? 'center'
                  : 'space-evenly'
                : matches
                ? 'flex-start'
                : 'space-evenly'
            }
            alignItems={matches ? 'center' : 'flex-start'}
            flexDirection={matches ? 'row' : 'column'}
            pl='15px'
          >
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems={matches ? 'flex-end' : 'flex-start'}
              pr={matches ? '30px' : '15px'}
            >
              <Typography className={classes.title} variant='h4' align='right'>
                Motivus Blog
              </Typography>
              <Typography variant='h5' color='secondary' align='right'>
                Select your language
              </Typography>
            </Box>
            <Box display='flex' alignContent='flex-end'>
              <FormControl className={classes.formControl}>
                <InputLabel className={classes.title}>Language</InputLabel>
                <Select
                  className={classes.title}
                  labelId='demo-controlled-open-select-label'
                  id='demo-controlled-open-select'
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={lang}
                  onChange={handleChange}
                  input={<BootstrapInput />}
                >
                  {languages.map((l, key) => (
                    <MenuItem key={key} value={l}>
                      {l}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
