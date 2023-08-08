import React from 'react'
import SEO from '../seo'
import {useTheme} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import MyAlgorithmsList from '../MyAlgorithmsList'
import Title from '../client/Title'
import CreateAlgorithms from '../client/CreateAlgorithm'
import {Box} from '@material-ui/core'
import withClientLayout from '../../hoc/withClientLayout'

const MyAlgorithm = ({...props}) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <React.Fragment {...props}>
      <SEO title='My Algorithms' />
      <Title text='My Algorithms' />
      <Box width={matches ? '90%' : '100%'}>
        <CreateAlgorithms />
        <MyAlgorithmsList />
      </Box>
    </React.Fragment>
  )
}

export default withClientLayout(MyAlgorithm)
