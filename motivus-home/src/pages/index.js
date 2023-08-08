import React from 'react'

import Layout from '../layouts/layout'
import SEO from '../components/seo'
import CLientOptions from '../components/ClientOPtionsV2'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorksStep'
import Intro from '../components/Intro'
import { Box } from '@material-ui/core'
import Loading from '../components/Loading'
import StaticLoading from '../components/StaticLoading'
import NoAlgorithms from '../components/NoAlgorithms'
import DevelopersInvitation from '../components/DevelopersInvitation'
import Challenges from '../components/Challenges'

const IndexPage = (props) => {
  return (
    <div>
      <Layout {...props}>
        <SEO title='Home' image='https://motivus.cl/icons/icon-256x256.png' />
        <StaticLoading />
        {/*<Intro />*/}
        <DevelopersInvitation />
        <Challenges />
        <Box mt='80px'>
          <CLientOptions />
        </Box>
        {/*<HowItWorks></HowItWorks>*/}
        <Features></Features>
      </Layout>
    </div>
  )
}

export default IndexPage
