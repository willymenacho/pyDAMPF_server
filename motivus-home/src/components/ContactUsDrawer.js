import React from 'react'
import Drawer from '@material-ui/core/Drawer'

import { Box, Modal } from '@material-ui/core'

import ContactUs from '../components/ContactUs'

class ContactUsDrawer extends React.Component {
  render() {
    return (
      <Drawer
        open={this.props.open}
        onClose={this.props.onClose}
        variant='persistent'
      >
        <Box width='100vw' height='100%'>
          <div role='presentation'>
            <ContactUs onClose={this.props.onClose}></ContactUs>
          </div>
        </Box>
      </Drawer>
    )
  }
}

export default ContactUsDrawer
