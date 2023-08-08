import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import _ from 'lodash'

import { navigate } from 'gatsby-link'
import { globalHistory } from '@reach/router'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  lang: {
    color: '#fff',
  },
}))

export default function DialogSelect({ translations }) {
  const path = globalHistory.location.pathname

  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const lang = _.findKey(translations, (p) => _.startsWith(path, '/' + p))

  const handleChange = (event) => {
    navigate('/' + event.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button className={classes.lang} onClick={handleClickOpen}>
        {lang}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select your language</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor='demo-dialog-native'>Language</InputLabel>
              <Select
                native
                value={translations[lang]}
                onChange={handleChange}
                input={<Input id='demo-dialog-native' />}
              >
                {_.values(
                  _.mapValues(translations, (link, langCode) => (
                    <option value={link}>{_.toUpper(langCode)}</option>
                  )),
                )}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
