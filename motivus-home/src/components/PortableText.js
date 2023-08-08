/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import BasePortableText from '@sanity/block-content-to-react'
import BlockContent from '@sanity/block-content-to-react'
import { Box, Divider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  quotes: {
    ...theme.typography.body2,
    textAlign: 'justify',
    textJustify: 'inter-word',
    borderLeft: '3px solid',
    borderColor: theme.palette.secondary.main,
  },
  h3: {
    ...theme.typography.h3,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: '2rem',
    fontWeight: '700',
  },
  externalLink: {
    background: '#000',
    color: theme.palette.secondary.main,
    padding: '2px',
    textDecoration: 'none',
    fontWeight: '500',
  },
  width: {
    width: '100%',
  },
}))

const serializers = {
  marks: {
    link: ({ children, mark }) => {
      const classes = useStyles()
      return (
        <a
          className={classes.externalLink}
          href={mark.href}
          rel='noopener noreferrer'
        >
          {children}
        </a>
      )
    },
  },

  types: {
    codepen: (props) => <Divider></Divider>,
    image: (props) => (
      <Box width='100%' display='flex' justifyContent='center' mb='30px'>
        <img
          src={props.node.asset.url}
          alt={props.node.asset.originalFilename}
        ></img>
      </Box>
    ),
    block: (props) => {
      const classes = useStyles()
      const { style = 'normal' } = props.node
      if (/^h\d/.test(style)) {
        const level = style
        switch (level) {
          case 'h1':
            return (
              // eslint-disable-next-line prettier/prettier
              <Box my="45px">
                <Typography variant='h1' color='secondary' gutterBottom>
                  {props.children}
                </Typography>
              </Box>
            )
          case 'h2':
            return (
              <Box my='25px'>
                <Typography variant='h2' gutterBottom>
                  {props.children}
                </Typography>
              </Box>
            )
          case 'h3':
            return (
              <Box className={classes.h3} my='20px'>
                {props.children}
              </Box>
            )
          case 'h4':
            return (
              <Box my='15px'>
                <Typography variant='h4' gutterBottom>
                  {props.children}
                </Typography>
              </Box>
            )
          case 'h5':
            return (
              <Box my='10px'>
                <Typography variant='h5' gutterBottom>
                  {props.children}
                </Typography>
              </Box>
            )
          case 'h6':
            return (
              <Box my='10px'>
                <Typography variant='h6' gutterBottom>
                  {props.children}
                </Typography>
              </Box>
            )
          case 'h7':
            return (
              <Box my='10px'>
                <Typography variant='h7' gutterBottom>
                  {props.children}
                </Typography>
              </Box>
            )
          default:
            return <span>{props.children}</span>
        }
      }
      if (style === 'blockquote') {
        return (
          <Box mx='20px' my='20px' pl='15px' className={classes.quotes}>
            {props.children}
          </Box>
        )
      }
      if (style === 'normal') {
        return (
          <Box width='100%' my='15px'>
            <Typography variant='body2' align='justify' gutterBottom>
              {props.children}
            </Typography>
          </Box>
        )
      }

      // Fall back to default handling
      return BlockContent.defaultSerializers.types.block(props)
    },
  },
}

const PortableText = ({ blocks }) => {
  const classes = useStyles()
  return (
    <BasePortableText
      className={classes.width}
      blocks={blocks}
      serializers={serializers}
    />
  )
}

export default PortableText
