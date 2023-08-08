import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Documentation from '../components/DocumentationMarkdown.md'
import { Box, Divider, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  getStarted: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: '30px',
    fontSize: '1.8rem',
  },
  descent: {
    fontSize: '1.3rem',
  },
  h1: {
    marginTop: '20px',
    fontStyle: 'normal',
    fontSize: '1.6rem',
    fontWeight: '600',
  },
  h2: {
    fontWeight: '500',
    fontFamily: 'Asap',
    fontSize: '1.25rem',
  },
  h3: {
    fontWeight: '500',
    fontFamily: 'Asap',
    fontSize: '1.1rem',
    marginBottom: '10px',
  },
  a: {
    color: theme.palette.secondary.main,
    backgroundColor: 'black',
    textDecoration: 'none',
    fontWeight: '400',
  },
  blockquote: {
    borderLeft: '4px solid',
    borderColor: theme.palette.secondary.main,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  th: {
    borderColor: theme.palette.text.primary,
  },
  table: {
    display: 'block',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },
}))

export default function MarkdownDocumentationReader({ data }) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Typography
        variant='h4'
        color='secondary'
        className={classes.getStarted}
        gutterBottom
      >
        Getting Started
      </Typography>
      <Divider />
      <ReactMarkdown
        children={Documentation}
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <Typography variant='h5' className={classes.h1} gutterBottom>
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography variant='h6' className={classes.h2} gutterBottom>
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography variant='h6' className={classes.h3} gutterBottom>
              {children}
            </Typography>
          ),
          a: ({ children, href }) => (
            <a href={href} className={classes.a}>
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <Box
              ml='10px'
              pl='10px'
              pt='10px'
              pr='5px'
              className={classes.blockquote}
            >
              {children}
            </Box>
          ),
          table: ({ children }) => (
            <table className={classes.table}>{children}</table>
          ),
          th: ({ children }) => <th className={classes.th}>{children}</th>,
        }}
      />
    </React.Fragment>
  )
}
