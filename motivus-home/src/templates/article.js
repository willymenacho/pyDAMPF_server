import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../layouts/layout'
import PortableText from '../components/PortableText'
import SEO from '../components/seo'
import { Box } from '@material-ui/core'
import '../components/layout.css'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import parseJSON from 'date-fns/parseJSON'
import formatISO from 'date-fns/formatISO'
import LanguageIcon from '@material-ui/icons/Language'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import LangSelector from '../components/LangSelector'
import Share from '../components/Share'

import { GatsbyImage } from 'gatsby-plugin-image'

const useStyles = makeStyles((theme) => ({
  header: {
    background: theme.palette.background.langSelector,
    zIndex: 1,
  },
  title: {
    ...theme.typography.articleTitle,
    color: '#fff',
  },
  langIco: {
    fill: '#fff',
  },
  lang: {
    ...theme.typography.lang,
    color: '#fff',
  },
  introduction: {
    ...theme.typography.introduction,
    textAlign: 'justify',
    textJustify: 'inter-word',
    color: '#fff',
  },
  authorImage: {
    border: '1px solid #fff',
    borderRadius: 1000,
    height: 45,
    width: 45,
  },
  verticalDivider: {
    background: '#fff',
  },
  authorName: {
    ...theme.typography.introduction,
    color: theme.palette.primary.light,
    fontWeight: '800',
  },
  articleDate: {
    ...theme.typography.introduction,
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  divider: {
    backgroundColor: '#fff',
  },
  lines: {
    backgroundColor: '#ffffff',
    opacity: 1,
    backgroundImage: 'radial-gradient(#000 0.1px, #fff 1px)',
    backgroundSize: '8px 8px',
  },
  fade: {
    background:
      'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 95%, rgba(255,255,255,1) 100%)',
  },

  author: {
    fontWeight: 600,
    fontSize: '1.2rem',
    color: theme.palette.secondary.main,
  },
}))

export default function AricleTemplate({ data, ...props }) {
  return (
    <Layout {...props}>
      <Article data={data} {...props} />
    </Layout>
  )
}

const Article = ({ data, ...props }) => {
  const translations = props.pageContext.translations[props.pageContext._id]
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <React.Fragment>
      <SEO
        title={data.sanityPost.title}
        description={data.sanityPost.abstract}
        image={data.sanityPost.image.asset.url}
      />
      <Box
        position='relative'
        width='100%'
        display='flex'
        flexDirection='column'
      >
        <Box display='flex' width='85%' ml='10%' maxHeight='430px' zIndex={0}>
          <GatsbyImage image={data.sanityPost.image.asset.gatsbyImageData} />
        </Box>
        <Box
          ml='5%'
          width='85%'
          mt='-50px'
          display='flex'
          className={classes.header}
          flexDirection='column'
          justifyContent='space-between'
          pb={matches ? '30px' : '75px'}
        >
          <Box
            ml='6%'
            mt='35px'
            width={matches ? '95%' : '65%'}
            mb={matches ? '20px' : '80px'}
            className={classes.title}
          >
            {data.sanityPost.title}
          </Box>

          <Box
            ml='6%'
            mr='6%'
            display='flex'
            flexDirection='column'
            alignItems='flex-end'
          >
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              mb='5px'
            >
              <LangSelector translations={translations} />
              <LanguageIcon className={classes.langIco} />
            </Box>
            <Box className={classes.divider} height='1px' width='100%' />
            <Box
              display='flex'
              flexDirection={matches ? 'column' : 'row'}
              justifyContent='space-between'
              mt='15px'
            >
              <Box display='flex' flexDirection='row'>
                <Box>
                  <GatsbyImage
                    className={classes.authorImage}
                    image={data.sanityPost.author.image.asset.gatsbyImageData}
                  />
                </Box>
                <Box
                  width='1px'
                  height='45px'
                  ml='7.5px'
                  mr='7.5px'
                  className={classes.verticalDivider}
                ></Box>
                <Box>
                  <Box className={classes.authorName} mb='5px'>
                    {data.sanityPost.author.name}
                  </Box>
                  <Box className={classes.articleDate}>
                    {formatISO(parseJSON(data.sanityPost.publishedAt), {
                      representation: 'date',
                    })}
                  </Box>
                </Box>
              </Box>

              <Box
                width={matches ? '100%' : '50%'}
                className={classes.introduction}
                mt={matches ? '80px' : '0px'}
              >
                {data.sanityPost.abstract}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          width='100%'
          top='25%'
          position='absolute'
          height='500px'
          zIndex={-3}
          className={classes.lines}
        />
        <Box
          position='absolute'
          display='flex'
          top='25%'
          height='500px'
          width='100%'
          zIndex={-1}
          className={classes.fade}
        />
      </Box>

      <Box
        display='flex'
        ml='10%'
        mr='15%'
        mt={matches ? '40px' : '20px'}
        justifyContent='center'
        //border='1px solid red'
        flexWrap='wrap'
      >
        {data.sanityPost._rawContent && (
          <PortableText blocks={data.sanityPost._rawContent} />
        )}
      </Box>

      <Share
        title={`Read ${data.sanityPost.title}`}
        url={props.location.href}
        twitterHandle={'MotivusHPCN'}
        tags={'Motivus'}
      />
    </React.Fragment>
  )
}

export const query = graphql`
  query ArticleTemplate($id: String!) {
    sanityPost(id: { eq: $id }) {
      title
      slug {
        current
      }
      _rawContent(resolveReferences: { maxDepth: 5 })
      abstract
      image {
        asset {
          url
          gatsbyImageData(width: 960)
        }
      }
      author {
        image {
          asset {
            gatsbyImageData
          }
        }
        id
        name
      }
      publishedAt
    }
  }
`
