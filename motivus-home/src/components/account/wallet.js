import React from 'react'
import Typography from '@material-ui/core/Typography'

import Title from '../client/Title'
import withClientLayout from '../../hoc/withClientLayout'

const Wallet = ({data, ...props}) => {
  return (
    <React.Fragment {...props}>
      <Title text='Virtual Wallet' />
      <Typography color='textPrimary' variant='subtitle1'>
        You Motivus virtual wallet! send, recive and buy Motivus
      </Typography>
    </React.Fragment>
  )
}

export default withClientLayout(Wallet)
