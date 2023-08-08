import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Typography, Box } from '@material-ui/core'
import Layout from '../layouts/layout'
import Seo from '../components/seo'
import MarkdownDocumentationReader from '../components/MarkdownDocumentationReader'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles((theme) => ({}))

export default function HomeDocumentation({ data }) {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <React.Fragment>
      <Seo title='Documentation' />
      <Layout>
        <Box width={matches ? '100%' : '90%'} margin='auto'>
          <Typography variant='h2'>Documentation</Typography>
          <MarkdownDocumentationReader />
        </Box>
      </Layout>
    </React.Fragment>
  )
}
