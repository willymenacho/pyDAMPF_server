import { navigate } from 'gatsby'
import React from 'react'

import ContactUs from '../components/ContactUs'
import Theme2 from '../components/StyleTheme'

const Contact = () => (
  <Theme2>
    <ContactUs onClose={() => navigate('/')}></ContactUs>
  </Theme2>
)

export default Contact
