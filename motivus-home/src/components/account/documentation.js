import React from 'react'
import Title from '../client/Title'
import MarkdownDocumentationReader from '../MarkdownDocumentationReader'
import {Box} from '@material-ui/core'
import withClientLayout from '../../hoc/withClientLayout'

function HomeDocumentation() {
  return (
    <React.Fragment>
      <Title text='Documentation' />
      <Box maxWidth='1000px'>
        <MarkdownDocumentationReader />
      </Box>
    </React.Fragment>
  )
}

export default withClientLayout(HomeDocumentation)
