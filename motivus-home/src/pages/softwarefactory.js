import React from 'react'
import Layout from '../layouts/layout'
import SEO from '../components/seo'
import Ending from '../components/SoftwareFactory/Ending'
import Intro from '../components/SoftwareFactory/Intro'
import References from '../components/SoftwareFactory/References'
import Steps from '../components/SoftwareFactory/Steps'

export default function SoftwareFactory() {
  return (
    <Layout>
      <SEO title='Software Factory' />
      <Intro></Intro>
      <Steps></Steps>
      <References></References>
      <Ending></Ending>
    </Layout>
  )
}
