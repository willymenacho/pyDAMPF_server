import { Box, Button, Typography } from '@material-ui/core'

import React from 'react'
import ContactToggle from '../../contexts/ContactToggle'

export default function Ending() {
  const [, setOpenContact] = React.useContext(ContactToggle)

  return (
    <Box py={8} mx={4}>
      <Typography
        variant='body1'
        align='left'
        color='textSecondary'
        gutterBottom
      >
        Please contact us using the form below to request a meeting, and we’ll
        create the best tailored solution for your data science needs.
      </Typography>
      <Box p={2} display='flex' width='100%' justifyContent='center'>
        <Button
          onClick={() => setOpenContact(true)}
          variant='outlined'
          color='secondary'
          size='large'
        >
          Request a meeting.
        </Button>
      </Box>
    </Box>
  )
}
