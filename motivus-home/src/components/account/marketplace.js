import React from 'react'
import Typography from '@material-ui/core/Typography'
import MarketplaceData from '../MarketplaceData'
import Title from '../client/Title'
import withClientLayout from '../../hoc/withClientLayout'

const ClientMarketplace = ({ ...props }) => {
  return (
    <React.Fragment {...props}>
      <Title text='Algorithm Marketplace' />
      <Typography color='textPrimary' variant='subtitle1'>
        Look for the algorithm that best fit to carry out your project” por:
        Find the algorithm best suited to your project.
      </Typography>
      <MarketplaceData />
    </React.Fragment>
  )
}

export default withClientLayout(ClientMarketplace)
