import React from 'react'
import Layout from '../layouts/layout'
import { graphql } from 'gatsby'
import { Box, Typography } from '@material-ui/core'
import Algorithm from '../components/Algorithm'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import Seo from '../components/seo'

export default function AlgorithmTemplate({ data, ...props }) {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <Layout {...props}>
      <Box px={matches ? '0px' : '15px'}>
        <Seo
          title={data.algorithm.name}
          description={`${data.algorithm.description} by ${data.algorithm.author}`}
        />
        <Typography variant='h2' color='secondary'>
          {data.algorithm.name}
        </Typography>{' '}
        <Algorithm data={data} {...props} />
      </Box>
    </Layout>
  )
}

export const pageQuery = graphql`
  query AlgorithmTemplateHome($id: String!) {
    algorithm(_id: { eq: $id }) {
      author
      github
      description
      longDescription
      name
      publishDate
      stars
      cost
      version
      web
      license
      id
    }
  }
`
